const express = require('express');
const Router = express.Router();

Router.get('/',(req ,res)=>{
    res.render("hello");
});



module.exports = Router;