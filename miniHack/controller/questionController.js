const mongoose = require('mongoose');
const questions = require('../question.json');
const questionModel = require('../model/questionModel');
const userModel = require('../model/userModel');


const getQuestionById = (id, cb) =>{
    questionModel.find({}, (err,res) =>{
        if(err) console.error(err);
        else if(res[id-1]){
            cb(null, res[id-1]);
        }
    }); 
}

const initQuestion = (question, cb) =>{
    questionModel.create(question, (err, res) => {
        if(err) console.error(err);
        else{
            cb('Success!');
        }
    });
}

const updateQuestion = (id, userAnswer, cb) =>{
    questionModel.find({}, (err,questions) =>{
        questions.forEach((question, index)=>{
            for(let i = 0; i < question.answers.length; i++){
                if(question.answers[i].content == userAnswer){
                    question.answers[i].totalSelect++;
                    question.save((err) =>{
                        if(err) console.error(err);
                        cb(null, question, questions[index+1]);
                    });
                }
            }
        })
    });
}

module.exports = {
    getQuestionById,
    initQuestion,
    updateQuestion
}