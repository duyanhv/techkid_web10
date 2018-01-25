

function formSubmit(e, string, answer){
    e.preventDefault();
    console.log(answer)
    $.ajax({
        url: '/api' + string,
        method: "POST",
        data: {
            answer: answer
        }
    }).done((data) =>{
        if(data._id){
            alert("Correct!")
            $("#question_content").text(data.content);
            let htmlAnswer = ""
            data.answers.forEach((answer, index)=>{
                htmlAnswer = htmlAnswer + "<li><input type='submit' name='answer' onclick='formSubmit(event, /answer/"+ data._id +", "+ answer.content +")' value='"+ answer.content +"'></li>"
                $("#answer_list").html(htmlAnswer);
            })
        }
    });
}