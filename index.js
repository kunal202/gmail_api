const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const passport = require('passport');
const session = require('express-session');
const auth = require('./routes/auth');
const send = require('./routes/send');

// global variable 
dotenv.config({ path: './config/config.env' })

require('./config/passport')(passport);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

// to use json body for input
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middleware for authentication
app.use('/auth', auth);
app.use('/mail', send);

// homepage 
app.get('/', (req, res) => {
    res.send('<p>You are on the homepage, please use postman to send requests</p>');
})

// PORT will run on 3000
app.listen(process.env.PORT || 3000, () => {
    console.log("Server has Started on https://localhost:3000/");
});