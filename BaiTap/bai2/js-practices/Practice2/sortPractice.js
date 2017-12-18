'use strict'

function swap(input, firstIndex, secondIndex){
  var temp = input[firstIndex];
  input[firstIndex] = input[secondIndex];
  input[secondIndex] = temp;
}

function sort(input){
  for(var i = 0; i < input.length; i++){
      var min = i;

      for(var j = i + 1; j < input.length; j++){
          if(input[j] < input[min]){
              min = j;
          }
      }

      if(i != min){
          swap(input, i, min);
      }
  }
  return input;
}

module.exports = sort
