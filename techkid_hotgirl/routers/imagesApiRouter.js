const express = require('express');
const Router = express.Router();
const imageModel = require('../models/imageModels');
const imageController = require('../controllers/imageController');

Router.post('/', (req, res) =>{
    imageController.create(req.body, (err, data) =>{
        if(err) console.error(err);
        try{
            if(data === 'Create failed'){
                res.send('Create failed');
            }else{
                res.json({
                    message: 'Create Successfully',
                    data: data
                });
            }
        }catch(Exception){
            console.log('heyhey');
        }
    });
});

Router.get('/', (req, res) =>{
    imageController.getAll((err,data) =>{
        if(err) console.error(err);
        res.json({
            message: 'Get Successfully',
            data: data
        });
    });
});

Router.get('/:id', (req, res) =>{
    imageController.getAllById(req.params.id, (err, data) =>{
        if(err) console.error(err);
        res.json({
            message: data
        });
    });
});

Router.put('/', (req, res) =>{
    imageController.update(req.body,(err,data)=>{
        if(err) console.error(err);
        res.send(data);
    });
});

Router.delete('/', (req, res) =>{
    imageController.deleteById(req.body, (err,data) =>{
        if(err) console.error(err);
        res.json({
            message: 'Delete Successfully'
        });
    });
});

module.exports = Router;