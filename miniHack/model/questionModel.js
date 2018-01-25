const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    content: {type: String, required: true},
    answers: [
        {
            content: {type: Number},
            totalSelect: {type: Number, default: 0}
        }
    ]
});

module.exports = mongoose.model("QuestionSchema", QuestionSchema);