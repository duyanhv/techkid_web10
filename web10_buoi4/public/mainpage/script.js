document.querySelector("#nav_toggle").addEventListener( "click", function() {
  this.classList.toggle("active");
});

function whyTho(){
  alert("There's a freaking button over there, click it!");
}

let flag = true;
function navButton(){    
  
  if(flag){
      document.getElementById("overlay_id").style.width = "100%";
      flag = false;
      console.log("open");
    }else{
      document.getElementById("overlay_id").style.width = "0%";
      flag = true;
      console.log("close");
    }
  }

