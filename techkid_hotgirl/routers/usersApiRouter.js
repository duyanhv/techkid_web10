const express = require('express');
const Router = express.Router();
const userModel = require('../models/userModel');
const userController = require('../controllers/userController');
const passport = require('passport');

Router.post('/', (req, res) => {
    userController.create(req.body, (err, data) =>{
        if(err) console.error(err);
        if(data == 'Create failed'){
            res.send('Create failed');
        }else{
            res.json({
                message: 'Create Successfully',
                data: data
            });
        }
    });
});

Router.get('/', (req, res) => {
    userController.getAll((err, data) =>{
        if(err) throw err;
        res.json(data);
    });
});

Router.get('/:id', (req, res) => {
    userController.getById(req.params.id, (err, data) =>{
        if(err) throw err;
        res.send(data);
    });
});

Router.put('/', (req, res) => {
    userController.update(req.body, (err, data) =>{
        if(err) throw err;
        res.send(data);
    });
});

Router.get('/test/ping', (req,res) =>{
    res.status(200).send('Pong!');
});

Router.delete('/', (req, res) => {
    
});

module.exports = Router;