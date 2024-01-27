require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const { createServer } = require('node:http');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({  secret: `${process.env.ACCESS_TOKEN_SECRET}`, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


const server = app.listen('3000', () => {
    console.log('Now listening on port 3000')
});

let io = require('./socket').init(server);

io.on('connection', (socket) => {
  console.log('connected');

  socket.on('join', function(room) {
      socket.join(room);
      console.log('joined ' + room);
  });
  
  socket.on('new-message-add', (message) => {
    console.log('added new message to ' + message.id);
    io.to(message.id).emit('get-message', message);
  });

  socket.on('update-message', (msg) => {
    console.log('message updated to ' + msg.id);
    io.to(msg.id).emit('get-update-message', msg);
  });

  socket.on('delete-message', (msg) => {
    console.log('message deleted at ' + msg.id);
    io.to(msg.id).emit('get-delete-message', msg);
  });

  socket.on('new-messenger-add', (msg) => {
    console.log('messenger message added to ' + msg.id);
    io.to(msg.id).emit('get-message-messenger', msg);
  });

  socket.on('update-messenger', (msg) => {
    console.log('messenger message updated to ' + msg.id);
    io.to(msg.id).emit('get-update-messenger', msg);
  });

  socket.on('delete-messenger', (msg) => {
    console.log('messenger message deleted at ' + msg.id);
    io.to(msg.id).emit('get-delete-messenger', msg);
  });

});

app.set('socketio', io);

const index = require('./routes/index');

app.use('/', index);


module.exports = app