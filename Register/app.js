const express = require('express');
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
let app = express();

const regRouter = require('./router/regRouter');
const config = require('./config');

app.use(bodyparser.urlencoded({ extended: true }));
app.engine("handlebars", handlebars({ defaultLayout: 'reg1' }));
app.set("view engine", "handlebars");


app.use('/', regRouter);


app.use(express.static('public'));
mongoose.connect(config.connectionString, { useMongoClient: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connect Successfully");
    }
});

app.listen(config.port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Connected on port ${config.port}`);
    }
});