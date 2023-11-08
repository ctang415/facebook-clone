require('dotenv')
const express = require('express')
const router = express.Router()
const users = require('./users')
const User = require('../models/user')
const passport = require('passport');
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken')

passport.use(
    new LocalStrategy({
        usernameField: 'email',
      }, async( username, password, done) => {
      try {
        const user = await User.findOne({ email: username });
         if (!user) {
            done(new Error('User does not exist'))
          return done(null, false, {message: "User does not exist" } );
        } else {
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            done(new Error('Password does not match'))
          return done(null, false, { message: "Password does not match" });
        } else {
            const limitedUser = await User.findOne( {email: username}).select('-password') 
            console.log(limitedUser)
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
            message: 'Something is not right',
            user : user
        });
    }       req.login(user, {session: false}, (err) => {
       if (err) {
           res.send(err);
       }
       const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
       return res.status(200).json({user, token})
    });
})(req, res);
} )

router.use('/users', users)

module.exports = router