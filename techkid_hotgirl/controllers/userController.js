const userModel = require('../models/userModel');

let create = (data, cb) =>{
    userModel.create(data, (err, res) =>{
        if(err) {
            console.error(err);
            cb(null, 'Create failed');
        }
        cb(null, res);

    });
}

let getAll = (cb) =>{
    userModel.find({}, (err ,res) =>{
        if(err) throw err;
        cb(null, res);
    });
}

let getById = (id, cb) =>{
    if(id.match(/^[0-9a-fA-F]{24}$/)){
        userModel.findById(id, (err, res) =>{
            if(err) throw err;
            if(res){
                cb(null, res);
            }else{
                cb(null, '404 not found');
            }
        });
    }else{
        cb(null, '404 not found');
    }
}

let update = (data, cb) =>{
    userModel.findById(data._id, (err, res) =>{
        if(err) throw err;
        if(!res._id) cb(null, 'not found');
        for(let key in res){
            if(data[key]){
                res[key] = data[key];
                console.log(key);
            }
        }
        res.save((err, res1) =>{
            if(err) throw err;
            cb(null, res1);
        });
    });
}

module.exports = {
    create,
    getAll,
    getById,
    update
}