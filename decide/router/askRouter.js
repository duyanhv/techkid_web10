const express = require('express');
const Router = express.Router();
const askController = require('../controller/askController');

Router.get('/', (req, res) => {
    res.render('ask', {
        heyActive: "active",
        askActive: "",
        answerActive: ""
    });
});

Router.get('/ask', (req, res) => {
    res.render('ask', {
        heyActive: "",
        askActive: "active",
        answerActive: ""
    });
});


var currentId;
Router.get('/question', (req, res) => {

    askController.randAnswer((ques) => {
        // console.log(ques);
        currentId = ques.id;
        res.render("answer", {
            heyActive: "",
            askActive: "",
            answerActive: "active",
            question: ques.question,
            id: currentId
        });
    });
    // console.log(question1);

});


Router.post('/', (req, res) => {

    askController.addQuestion(req.body.question, (id) => {
        console.log(`hey: ${id}`);
        res.redirect(`/question/${id}`);
    });

    // let question = askController.findQuestionByID(id);
    // console.log(question);


});


Router.post('/:id', (req, res) => {
    console.log(req.params.id);
    if (req.body.answer == 'YES') {
        askController.updateVoteYes(req.params.id, (err, result) => {

        });
    } else if (req.body.answer == 'NO') {
        askController.updateVoteNo(req.params.id, (err, result) => {

        });
    }
    res.redirect(`/question/${req.params.id}`);
});

Router.post('/n', (req, res) => {

});


const checkNan = (x) => {
    if (isNaN(x)) {
        return 0;
    }
    return x;
}

const checkZero = (yes, no, total) => {
    if (checkNan(((yes / total) * 100)) == 0 && checkNan(((no / total) * 100)) == 0) {
        console.log(`checkZero1- yes: ${yes}, no: ${no}, total: ${total}`);
        return { yes: 50, no: 50 };
    } else if (checkNan(((yes / total) * 100)) == 0 && checkNan(((no / total) * 100)) != 0) {
        console.log(`checkZero2- yes: ${yes}, no: ${no}, total: ${total}`);
        return { yes: 0, no: 100 };
    } else if (checkNan(((yes / total) * 100)) != 0 && checkNan(((no / total) * 100)) == 0) {
        console.log(`checkZero3- yes: ${yes}, no: ${no}, total: ${total}`);
        return { yes: 100, no: 0 };
    } else if (checkNan(((yes / total) * 100)) != 0 && checkNan(((no / total) * 100)) != 0) {
        console.log(`checkZero4- yes: ${yes}, no: ${no}, total: ${total}`);
        return {
            yes: Math.floor((yes / total) * 100),
            no: Math.floor((no / total) * 100)
        }
    }
}

Router.get('/question/:id', (req, res) => {
    let total = 0;
    let yes = 0;
    let no = 0;
    askController.findQuestionByID(req.params.id, (ques) => {
        yes = ques.yes;
        no = ques.no;
        total = yes + no;
        let result = checkZero(yes, no, total);
        res.render("question", {
            question: ques.question,
            totalVote: total,
            yesPercentage: result.yes,
            noPercentage: result.no
        });
    });

});

module.exports = Router;