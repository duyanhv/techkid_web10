const express = require('express');
const Router = express.Router();
// const fs = require('fs');
const fc = require('./fileController');
// var askjson = require('./ask.json');
const QuestionSchema = require('./model/questionModel');
const askjson = fc.exists('ask.json') ? require('./ask.json') : initJson();
// const askjson = "";
function initJson() {

    if (!fc.exists('ask.json')) {
        fc.writeFile('ask.json', '[{"id":0,"question":"","yes":0,"no":0}]');
        console.log("chay vao initJson");
    } else {
        console.log("file exixsted");
    }
    
}




function pushJson(question1) {
    console.log(askjson.length);

    var jsonStr = askjson;
    var newValues = { "id": askjson.length, "question": question1, "yes": 0, "no": 0 };
    jsonStr.push(newValues);
    fc.writeFile('ask.json', JSON.stringify(jsonStr));
    console.log("Chay vao pushJson");



}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    var rand = Math.floor(Math.random() * (max - min)) + min;

    return rand;
}


Router.get('/', (req, res) => {
    res.render("ask",{
        homepageActive: "active",
        askActive: "",
        answerActive: ""
    });


});

Router.get('/ask', (req, res) => {

    res.render("ask",{
        homepageActive: "",
        askActive: "active",
        answerActive: ""
    });
    // initJson();
    // pushJson();
});

Router.get('/sub', (req, res) => {
    res.send("Sub page");

});

let current = 0;

function randomAskk() {

    //TODO: hoc toan
    var randomAsk = randomInt(0, askjson.length - 2) + 1;
    current = (current + randomAsk) % (askjson.length - 1);
    // console.log(current);
    return current + 1;
    // console.log("randomAsk 1:" +randomAsk);
    // console.log(`current: ${current}, randomAsk: ${randomAsk}`);
    // if (randomAsk === current) {
    //     return randomAskk();
    // }
    // else {
    //     current = randomAsk;
    //     // console.log(randomAsk);
    //     return randomAsk;
    // }
}
let i = 0;

var id = 0;

Router.get('/answer', (req, res) => {

    i = randomAskk();

    res.render("answer", {
        answer: askjson[i].question,
        id: "/question/" + i,
        homepageActive: "",
        askActive: "",
        answerActive: "active"
    });
    // console.log(askjson);
});


Router.post('/ask/send', (req, res) => {
    let question = req.body.question;
    QuestionSchema.create({question}, (err,res) =>{
        if(err){
            console.log(err);
        }else{
            console.log(res);
            id = res._id;
            console.log(id);
            QuestionSchema.findQuestionById(id,function (err,questionid){
                console.log(questionid.question);
            }); 
        }
    });

    // pushJson(req.body.question);

    res.render("ask");
    // pushJson(req.body.question);
    console.log(req.body.question);

});

Router.post('/answer/y', (req, res) => {
    askjson[i].yes++;

    fc.writeFile('ask.json', JSON.stringify(askjson));

    res.redirect("/question/" + i);
});

Router.post('/answer/n', (req, res) => {
    askjson[i].no++;

    fc.writeFile('ask.json', JSON.stringify(askjson));

    res.redirect("/question/" + i);
});

Router.get('/question/:id', (req, res) => {
    var id = req.params.id;
    // res.send(id);
    var total = askjson[i].yes + askjson[i].no;
    var yesPercentage = Math.floor((askjson[i].yes / total) * 100);
    var noPercentage = Math.floor((askjson[i].no / total) * 100);

    res.render("question", {
        question: askjson[i].question,
        totalVote: total,
        yesPercentage : yesPercentage,
        noPercentage : noPercentage
    });
});


module.exports = Router;
