function reloadSite(){
    window.location.reload();
}
var i = 200;
$(document).ready(function(){
    $("#num_count").text(200);
    $("textarea").keypress(function(){
        $("#num_count").text(i -= 1);
        if(i == 0){
            $("textarea").prop('disabled', true);
        }
    });
    
});