require('dotenv')
const express = require('express')
const router = express.Router()
const users = require('./users')
const User = require('../models/user')
const passport = require('passport');
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken')
/*
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
        return done(err);
      };
    })
  );

 router.post('/', function (req, res, next) { 
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
        return res.status(400).json({
            errors: info,
        });
        }       
        req.login(user, {session: false}, (err) => {
            if (err) {
                return res.status(401).json(err);
            }
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {expiresIn: '20m' });
            return res.status(200).json({user, accessToken})
        });
    })
    (req, res);
} )

router.post('/logout', function(req, res, next){
    req.logout( async function(err) {
      if (err) { return next(err); }
     
      res.status(200).json({success: true})
    })
})
*/

router.use('/users', users)

module.exports = router