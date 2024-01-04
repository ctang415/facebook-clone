require('dotenv')
const express = require('express')
const router = express.Router()
const users = require('./users')
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken')

router.use('/users', users)

module.exports = router