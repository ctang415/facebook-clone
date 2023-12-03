require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
const http = require('http');
const { createServer } = require('node:http')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const Token = require('../models/token')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy;
const Post = require('../models/post')
const Chat = require('../models/chat')
const Message = require('../models/message')
const Friend = require('../models/friend')
const Comment = require('../models/comment')
const session = require('express-session')
const jwt = require('jsonwebtoken')
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
app.use(cookieParser());
app.use(session({  secret: `${process.env.ACCESS_TOKEN_SECRET}`, resave: false, saveUninitialized: true }));
app.use(passport.initialize()); 
app.use(passport.session())

const server = app.listen('4000', () => {
    console.log('Now listening on port 4000')
})

function generateAccessToken (user) {
    return jwt.sign({user: user.id}, `${process.env.ACCESS_TOKEN_SECRET}`, {expiresIn: '15m'})
}

passport.use(
    new LocalStrategy({
        usernameField: 'email',
      }, async( username, password, done) => {
      try {
        const user = await User.findOne({ email: username });
        if (!user) {
            return done(null, false, {message: "User does not exist" } );
        } else {
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                return done(null, false, { message: "Password does not match" });
            } else {
                const limitedUser = await User.findOne( {email: username}).select('-password').populate(
                    [{path :'posts', options: { sort: { 'timestamp' : 1}},
                    populate: [{ path: 'author', select: '-password'}, { path: 'comments', populate: { path: 'author', select: '-password'} } ]  }, 
                    { path: 'chats', populate: [{ path: 'messages', populate: {path: 'author', select: '-password'}}, {path: 'users', select: '-password'}]},
                    {path: 'friends', populate: {path: 'users', select: '-password', populate: { path: 'posts', options: { sort: { 'timestamp' : 1}},
                    populate: [{ path: 'author', select: '-password'}, {path: 'comments', populate: {path: 'author', select: '-password'}} ]}} } ])
//                    console.log(limitedUser)
                return done(null, limitedUser);
            }
        }
      } catch(err) {
        console.log(err)
        return done(err);
      };
    })
  );


//let io = require('./socket').init(server)

app.post('/', function (req, res, next) { 
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
        return res.status(400).json({
            errors: info,
        });
        }       
        req.login(user, {session: false}, async (err) => {
            if (err) {
                return res.status(401).json(err);
            }
            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign({user: user.id}, `${process.env.REFRESH_TOKEN_SECRET}`, {expiresIn: '1hr'})
            const newToken = new Token( {
                token: refreshToken
            })
            newToken.save()
            const updatedUser = await User.findByIdAndUpdate(user.id, {'token' : newToken.id }).select('-password').populate(
                [{path :'posts', options: { sort: { 'timestamp' : 1}},
                populate: [{ path: 'author', select: '-password'}, { path: 'comments', populate: { path: 'author', select: '-password'} } ]  }, 
                { path: 'chats', populate: [{ path: 'messages', populate: {path: 'author', select: '-password'}}, {path: 'users', select: '-password'}]},
                {path: 'friends', populate: {path: 'users', select: '-password', populate: { path: 'posts', options: { sort: { 'timestamp' : 1}},
                populate: [{ path: 'author', select: '-password'}, {path: 'comments', populate: {path: 'author', select: '-password'}} ]}} } ])  
                req.token = refreshToken
            return res.cookie('token', accessToken, {
                secure: true,
                httpOnly: true,
                sameSite: "strict"
            }).status(200).json({user: updatedUser, accessToken, refreshToken})
        });
    })(req, res);
} )

app.post('/token', async (req, res) => {
    const findToken = await Token.findById(req.body.token)
    if (findToken === null) {
        return res.status(403)
    }
    jwt.verify(findToken.token, `${process.env.REFRESH_TOKEN_SECRET}`, async (err, user) => {
        if (err) return res.status(403).json({err})
        const accessToken = generateAccessToken(user)
        const newToken = new Token (
            {
                token: accessToken
            }
        )
        let newAccessToken = newToken.save()
        const findUser = await User.findByIdAndUpdate(user.user, {'token' : newAccessToken.id})
        res.cookie('token', accessToken, {
            secure: true,
            httpOnly: true,
            sameSite: "strict"
        }).status(200).json({accessToken})
   })
})

app.delete('/', function(req, res, next){
    req.logout( async function(err) {
      if (err) { return next(err); }
      const token = await Token.findById(req.body.token)
      if (token == null) {
        return res.status(401).json({errors: 'token not found'})
        }
        const [ updateUser, removeToken] = await Promise.all( [
        User.findByIdAndUpdate(req.body.user, {'token': null }),
        Token.findByIdAndRemove(req.body.token)
        ])
      res.status(200).json({success: true})    
    })
})
