$('input.form-control').on('blur', (e) => {
    e.preventDefault();
    
    let x1 = $('input[name = "username"]').val();
    let x2 = $('input[name = "email"]').val();
    if(!x1){
        $('#danger1').css("display", "");
    }else{
        $('#danger1').css("display", "none");
    }
    if(!x2){
        $('#danger2').css("display", "");
    }else{
        $('#danger2').css("display", "none");
    }
    
    
    $.ajax({
        url: '/',
        method: 'POST',
        data: {
            username: x1
        },
        
    })
    .done((hey) =>{
        if(hey !== "!res1"){
            $('#strong').html(hey+"");
            $('#danger1_1').css("display", "");
            $('#danger1_2').css("display", "none");
            $('#strong_success').html("");
        }else{
            $('#danger1_1').css("display", "none");
            $('#danger1_2').css("display", "");
            $('#strong_success').html(x1+"");
        }
        
    });

});