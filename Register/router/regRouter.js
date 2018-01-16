const express = require('express');
const Router = express.Router();

const userController = require('../controller/userController');

Router.get('/', (req, res) => {
    res.render('main');
});

Router.post('/', (req, res) => {
    var newUser = {
        username: req.body.username,
        email: req.body.email
    };
    userController.getUserListByName(req.body.username, (err1, res1) => {

        if (err1) {
            console.error(err1);
        }
        // console.log(res1);
        if (res1) {
            res.send(res1.username);
        } else {
            res.send('!res1');
        }
    });

    // userController.addUser(newUser, (err, data) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         res.render('req', {
    //             username: data.username
    //         });
    //     }
    // });


});





module.exports = Router;
