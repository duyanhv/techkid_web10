'use strict'



function generate(numberOfTestcases, filePath = "./test-data.json"){
  
  // return Array.from(Array(numberOfTestcases)); // Remove this line and change to your own algorithm


  let testType =["MIDDLE_INDEX","NOT_FOUND","FIRST_INDEX","LAST_INDEX","ZERO_LENGTH"];

  const array_length_min = 0;
  const array_length_max = 500;
  const min = -10000;
  const max = 10000;

  
  function randomInt(min, max){
    return Math.floor(Math.random()*(max - min)) + min;
  }

  var input = [];
  var target = [];
  var output = [];
  function createTestCase(testType){
    const lengthToGen = randomInt(array_length_min,array_length_max);
    
    if(testType === "ZERO_LENGTH"){
      return{
        input: [],
        target: randomInt(min,max),
        output: -1
      }
    }

    

    for(var i = 0; i < lengthToGen; i++){
      var num = randomInt(min,max);

      // for(let sInput of sortedInput){
      //   if(num >= sInput){
      //     num++;
      //   }

      //   input.push(num);

      //   if(sortedInput.length == 0 || sortedInput[sortedInput.length - 1] < num){
      //       sortedInput.push(num);
      //   }else{
      //     for(var i = 0; i < sortedInput.length; i++){
      //       if(sortedInput[i] > num){
      //         sortedInput.splice(i, 0 ,num);
      //         break;
      //       }
      //     }
      //   }
        
           if(input.length == 500){
             break;
           }else{
              if(input.indexOf(num) === -1)
                input.push(num);
           }
          
      
         input.sort();
      }
      
    

    let notfound = input.length === lengthToGen ? input.splice(randomInt(0,input.length), 1)[0] : min-1;
     output = createTestCaseOutput(testType, input);
     target = output === -1 ? notfound : input[output];
    

    return {
      input,
      target,
      output
    }
  }

  function createTestCaseOutput(testType,input){
    switch(testType){
      case "NOT_FOUND":
        return -1;
        break;
      
      case "FIRST_INDEX":
        return 0;
        break;
      case "LAST_INDEX":
        return input.length - 1;
        break;
      case "MIDDLE_INDEX":
        return Math.floor(input.length/2);
        break;
      case "ZERO_LENGTH":
        return -1;
        break;
      }
    }


    let test_cases = [];

    for(let i = 0; i < numberOfTestcases; i++){
      
      let test_case ={};

      let type = testType[randomInt(0,4)];
      test_case = createTestCase(type);
      test_cases.push(test_case);
    }
    return test_cases;
  }



module.exports = generate
