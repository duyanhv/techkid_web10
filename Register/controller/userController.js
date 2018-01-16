const UserSchema = require('../model/userModel');

const getUserList = (callback) =>{
    UserSchema.find({}, (err, res) =>{
        if(err){
            callback(err);
        }else{
            callback(null, res);
        }
    });
}

const getUserListByName = (user,callback) =>{
    UserSchema.findOne({username: user}, (err, res) =>{
        if(err){
            callback(err);
        }else{
            callback(null, res);
        }
    });
}


const addUser = (user, callback) =>{
    UserSchema.create(user, (err, res) =>{
        if(err){
            callback(err);
        }else{
            callback(null, res);
        }
    });
}


module.exports = {
    getUserList,
    addUser,
    getUserListByName
}