const express = require('express');
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
// const passport = require('passport');
// const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

let app = express();
app.use(morgan('dev'));
app.use(cookieParser());

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(session({
    secret: 'duyanhv',
    resave: true,
    saveUninitialized: false
})); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions


const config = require('./config');

app.engine("handlebars", handlebars({ defaultLayout: 'main' }));
app.set("view engine", "handlebars");

const imageApi = require('./routers/imagesApiRouter');
const userApi = require('./routers/usersApiRouter');

app.use('/api/image', imageApi);

app.use('/api/user', userApi);

app.use(express.static('public'));
mongoose.connect(config.connectionString, (err) => {
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