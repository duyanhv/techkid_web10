const questionModel = require('../model/questionModel');

const addQuestion = (question, callback) => {
    questionModel.create({ question }, (err, res) => {
        if (err) console.log(err);
        callback(res._id);
    });
}

const findQuestionByID = (id, callback) => {
    questionModel.findQuestionByID(id, (err, quesID) => {
        if (err) console.log(err);
        callback(quesID);
    });
}

const randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return rand = Math.floor(Math.random() * (max - min)) + min;
}

const randNum = (currentLength) => {
    let currentNum = 0;
    let randNumber = randomInt(1, currentLength -2) + 1;
    currentNum = (currentNum + randNumber) % (currentLength - 1);
    return currentNum + 1;
}

const randAnswer = (callback) => {
    questionModel.find((err, res) => {
        
        let current = [];
        let j = 0;
        if(err) console.log(err);
        for(let i = 0; i < res.length; i++){
            current.push(res[i].question);
        }
    
        j = randNum(current.length);
        // console.log(`j: ${j}`);

        let cb = {
            question: res[j].question,
            id: res[j]._id
        }
        callback(cb);
    });
}


const updateVoteYes = (id,callback) =>{
    questionModel.updateOne(
        {_id: id},
        {$inc: {'yes': 1}},
        {upsert: true}, (err, res) => {
            if(err) throw err;
            console.log(res);
        });
}

const updateVoteNo = (id,callback) =>{
    questionModel.updateOne(
        {_id: id},
        {$inc: {'no': 1}},
        {upsert: true}, (err, res) => {
            if(err) throw err;
            console.log(res);
        });
}

module.exports = {
    addQuestion,
    findQuestionByID,
    randAnswer,
    updateVoteYes,
    updateVoteNo
}