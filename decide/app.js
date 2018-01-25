const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const askRouter = require('./router/askRouter');

app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars", handlebars({ defaultLayout: 'mainpage' }));
app.set("view engine", "handlebars");

app.use('/', askRouter);
app.use('/ask', askRouter);
app.use('/answer', askRouter);
app.use('/question', askRouter);

app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/decide",
    {
        useMongoClient: true
    },
    (err) => {
        if (err) console.log(err);
        console.log("Connect successfully");
    });

app.listen(8080, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`running on port 8080`);
    }

});

