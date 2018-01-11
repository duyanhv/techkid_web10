const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question : { type: String, required: true },
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 }
});

QuestionSchema.statics.findQuestionById = function (id, cb) {
    return this.findOne({
        _id : {$eq: id}
    }, cb);
}

module.exports = mongoose.model("question", QuestionSchema);