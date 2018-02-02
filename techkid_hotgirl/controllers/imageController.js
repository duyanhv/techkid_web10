const imageModel = require('../models/imageModels');

let create = (image, callback) => {
    imageModel.create(image, (err, res) => {
        if (err) {
            console.error(err);
            callback(null, 'Create failed');
        }
        callback(null, res);
    })
}

let getAll = (callback) => {
    imageModel.find({}, (err, res) => {
        if (err) console.error(err);
        callback(null, res);
    });
}

let getAllById = (id, cb) => {
    imageModel.findById(id, (err, res) => {
        if (err) console.error(err);
        if (!res._id) cb(null, 'Not Found');
        cb(null, res);
    });
}

let update = (data, cb) => {
    imageModel.findById(data._id, (err, res) => {
        if (err) console.error(err);
        if (!res._id) cb(null,'not found');
        for (let key in res){
            if(data[key]){
                res[key] = data[key];
            }
        }
        res.save((err, res1) =>{
            if(err) console.error(err);
            cb(null, res1);
        })
    });
}

let deleteById = (id, cb) =>{
    imageModel.remove(id, (err, res) =>{
        if (err) console.error(err);
        cb(null);
    });
}

module.exports = {
    create,
    getAll,
    getAllById,
    update,
    deleteById
}