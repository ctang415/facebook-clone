require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
const http = require('http');
const { createServer } = require('node:http')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
mongoose.connect(`${process.env.mongodb}`, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();
app.use(express.json());
app.use(cors(
    { 
      origin: true, 
      credentials: true,    
    }
    ));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({  secret: `${process.env.ACCESS_TOKEN_SECRET}`, resave: false, saveUninitialized: true }));
app.use(passport.initialize()); 
app.use(passport.session())


const server = app.listen('3000', () => {
    console.log('Now listening on port 3000')
})

let io = require('./socket').init(server)

const index = require('./routes/index')

app.use('/', index)


module.exports = app