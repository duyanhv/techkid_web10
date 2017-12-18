'use strict'



function generate(numberOfTestcases, filePath = "./test-data.json"){
  // return Array.from(Array(numberOfTestcases)); // Remove this line and change to your own algorithm

  require('util');
  const fs = require('fs');
  const path = require('path');
  
  const AMOUNT_TO_GENERATE = parseInt(process.argv[2] || 1000);
  const OUTPUT_FILE_PATH = path.join(__dirname, process.argv[3] || 'practice1-test-data.json');
  
  
  const array_length_min = 0;
  const array_length_max = 500;
  const min = -10000;
  const max = 10000;
  
  const TestType ={
    RANDOM :      0,
    NOT_FOUND:    1,
    RESULT_FIRST: 2,
    RESULT_LAST:  3,
    ZERO_LENGTH:  4
  }

  const candidates = new Array(Array(max - min + 1).fill().map((item,index) => min + index));
  function randomInt(min,max){
    return Math.floor(Math.random()*(max - min)) + min;
  }

  function createTestCase(testType = TestType.RANDOM){
    if(testType == TestType.ZERO_LENGTH){
      return{
        input: [],
        target: randomInt(min,max),
        output: -1
      }
    }

    const lengthToGenerate = randomInt(array_length_min,array_length_max+2);
    const input = [];
    const sortedInput = [];

    for(var gen = 0; gen < lengthToGenerate; gen++){
        var num = randomInt(min,max - gen);

        for(let sInput of sortedInput){
          if(num >= sInput) num++;
        }

        input.push(num);


        if(sortedInput.length == 0 || sortedInput[sortedInput.length - 1] < num){
          sortedInput.push(num);
        }else{
          for(var i  = 0; i < sortedInput.length; i++){
            if(sortedInput[i] > num){
              sortedInput.splice(i,0,num);
              break;
            }
          }
        }
    }

    const notfound = input.length === lengthToGenerate ? input.splice(randomInt(0, input.length), 1)[0] : min - 1;

    const output = getTestcaseOutput(testType,input);

    const target = output === -1 ? notfound : input[output];

    return {
      input,
      target,
      output
    }

  }
  
  function getTestcaseOutput(testType,input){
    switch(testType){
      case TestType.NOT_FOUND:
        return -1;
        break;
      case TestType.RESULT_FIRST:
        return 0;
        break;
      case TestType.RESULT_LAST:
        return input.length -1;
        break;
      case TestType.RANDOM:
      default:
        return input.length > 0 ? randomInt(0, input.length) : -1;
        break;
    }
    return input.length > 0 ? randomInt(0, input.length) : -1;
  }


var tgen = process.hrtime();
const tests = Array.from(Array(AMOUNT_TO_GENERATE > 4 ? AMOUNT_TO_GENERATE-4 : AMOUNT_TO_GENERATE), (item, index) => {
  if(index > 0){
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
  }
  process.stdout.write(`Generating test case no ${index+1}/${AMOUNT_TO_GENERATE}`);
  return createTestcase();
});
process.stdout.clearLine();
process.stdout.cursorTo(0);
process.stdout.write(`Generating test case no ${AMOUNT_TO_GENERATE}/${AMOUNT_TO_GENERATE}`);
if(AMOUNT_TO_GENERATE > 4){
  tests.splice(randomInt(0, tests.length),0, createTestcase(TestType.NOT_FOUND));
  tests.splice(randomInt(0, tests.length),0, createTestcase(TestType.RESULT_FIRST));
  tests.splice(randomInt(0, tests.length),0, createTestcase(TestType.RESULT_LAST));
  tests.splice(randomInt(0, tests.length),0, createTestcase(TestType.ZERO_LENGTH));
}
process.stdout.write('\n');

if(tests.length !== AMOUNT_TO_GENERATE) console.log("Error test length: ", tests.length, AMOUNT_TO_GENERATE);

fs.writeFileSync(OUTPUT_FILE_PATH, JSON.stringify(tests));
var tgen = process.hrtime(tgen);
}

module.exports = generate
