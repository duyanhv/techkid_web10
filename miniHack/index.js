const express = require('express');
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
let app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const questionController = require('./controller/questionController');

const config = require('./config');

app.engine("handlebars", handlebars({defaultLayout: 'main'}));
app.set("view engine", "handlebars");

app.get('/', (req, res)=>{
    questionController.getQuestionById('1', (err, question)=>{
        if (err) {console.log(err)}
        res.render('home', {
            question: question,
            totalPoint: 0,
            id: req.params.id
        })
    });
});

app.post('/', (req,res)=>{
    questionController.initQuestion(req.body, (err, res1) =>{
        if(err) console.error(err);
        else{
            res.send(res1);
        }
    });
});

app.get('/question/:id', (req, res)=>{
    questionController.getQuestionById(req.params.id, (err, question)=>{
        if (err) {console.log(err)}
        res.send(question);
    });
});

app.post('/api/answer/:id', (req, res)=>{
    questionController.updateQuestion(req.params.id, req.body.answer, (err, question, nextQuestion)=>{
        if (err) {console.log(err)}
        if (nextQuestion._id) {res.send(nextQuestion)};
    })
});

app.use(express.static('public'));
mongoose.connect(config.connectionString, { useMongoClient: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connect Successfully");
    }
});

app.listen(config.port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Connected on port ${config.port}`);
    }
});