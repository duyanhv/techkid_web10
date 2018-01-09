function reloadSite(){
    window.location.reload();
}
var i = 200;
$(document).ready(function(){
    $("#num_count").text(200);
    

    $('textarea').keydown(function(){
        // $("#num_count").text(i -= 1);
        // if(i == 0){
        //     $("textarea").prop('disabled', true);
        // }
        var numTa = $(this).val().length;
        $("#num_count").text(200 - numTa);
        // console.log(currentCharTa);
        if(numTa > 200){
            console.log(numTa);
            $("#num_count").text(0);
            $(this).prop('disabled', true);
        }
    });
    
});