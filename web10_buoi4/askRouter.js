const express = require('express');
const Router = express.Router();
const fc = require('./fileController');
const askjson = require('./ask.json');

function initJson(){

    if(!fc.exists('ask.json')){
        fc.writeFile('ask.json','[{"id":0,"question":"","yes":0,"no":0}]');
        console.log("chay vao initJson");
    }else{
        console.log("file exixsted");    
    }
    
}



function pushJson(question1){
    console.log(askjson.length);

    var jsonStr = askjson;
    var newValues =  {"id" : askjson.length, "question": question1, "yes": 0, "no": 0};
    jsonStr.push(newValues);
    fc.writeFile('ask.json', JSON.stringify(jsonStr));
    console.log("Chay vao pushJson");
   
    
    
}

function randomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);

    var rand = Math.floor(Math.random() * (max - min)) + min;

    return rand;
}


Router.get('/',(req, res)=>{
    res.render("ask");

    
});

Router.get('/ask', (req,res) =>{
    res.render("ask");
    initJson();
    // pushJson();
});

Router.get('/sub', (req,res)=>{
    res.send("Sub page");
  
});

let current = [];




function randomAskk(){
    var randomAsk = randomInt(1, askjson.length);
    // console.log("randomAsk 1:" +randomAsk);
    current.push(randomAsk);
    console.log("current length:" + current.length);
    while(current[current.length - 1] == current[current.length - 2]){
        randomAskk();
    }
        // console.log(randomAsk);
        return randomAsk;
    

    // console.log(current);
    
}
let i;
Router.get('/answer', (req, res)=> {
    
     i = randomAskk();
    // console.log(i);
    res.render("answer",{
        answer : askjson[i].question,
        id : "/question/" + i
     });
    // console.log(askjson);
});

Router.post('/ask/send', (req,res) =>{
    pushJson(req.body.question);

    res.render("ask");
    // pushJson(req.body.question);
    console.log(req.body.question);
    
});

Router.post('/answer/y', (req, res) => {
    askjson[i].yes++; 

    fc.writeFile('ask.json', JSON.stringify(askjson));

    res.render("question",{
        varibles: "Question: " + askjson[i].question + '</br>' + "Yes: " + askjson[i].yes + '</br>' + "No: " + askjson[i].no
    });
});

Router.post('/answer/n', (req, res) => {
    askjson[i].no++; 

    fc.writeFile('ask.json', JSON.stringify(askjson));

    res.render("question",{
        varibles: "Question: " + askjson[i].question + '</br>' + "Yes: " + askjson[i].yes + '</br>' + "No: " + askjson[i].no
    });
});

Router.get('/question/:id', (req, res) =>{
    var id = req.params.id;
    // res.send(id);
    
    res.render("question",{
        varibles: "Question: " + askjson[i].question + '</br>' + "Yes: " + askjson[i].yes + '</br>' + "No: " + askjson[i].no
    });
});


module.exports = Router;
