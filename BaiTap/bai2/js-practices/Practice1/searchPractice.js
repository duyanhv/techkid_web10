'use strict'

function search(input, target) {
  // return input.indexOf(target);  // Remove this line and change to your own algorithm
   if(input.length > 1){
    for(var i = 0; i < input.length; i++){
      if(input[i] == target){
          return i;
      }else{
          continue;
      }
    } 
  }else if(input.length <= 1){
    return -1;
  }

  return -1;
}

module.exports = search
