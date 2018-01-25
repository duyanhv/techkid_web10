const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    score: {type: Number, required: true},
    answers: [
        {
            id: {type: Number, required:true},
            answer:{type: Number, required: true}
        }
    ],
    username: {type: String},
    password: {type: String}

});

module.exports = mongoose.model("UserSchema", UserSchema);