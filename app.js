require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
const { createServer } = require('node:http');  
const bodyParser = require('body-parser')
const { Server } = require('socket.io');
const cors = require('cors')
const index = require('./routes/index')
const passport = require('passport')
const session = require('express-session')

mongoose.connect(`${process.env.mongodb}`, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();
const server = createServer(app);
app.use(express.json());
app.use(cors(
    { 
      origin: true, 
      credentials:true,    
    }
    ));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({  secret: `${process.env.JWT_SECRET}`, resave: false, saveUninitialized: true }));
app.use(passport.initialize()); 
app.use(passport.session())

const io = new Server(server);

app.use('/', index)

app.listen('3000', () => {
    console.log('Now listening on port 3000')
})

module.exports = app