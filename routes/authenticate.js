require('dotenv').config()
const jwt = require('jsonwebtoken')
const Token = require ('../models/token')

function authenticateToken (req, res, next) {
    const token = req.cookies.token
    console.log(token)
    if (token == undefined) return res.status(403).json({error: 'Token does not exist'})
    jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, (err, user) => {
       if (err) return res.status(404).json({error: err})
       req.user = user
       req.token = token
       console.log('authenticate')
       return next()
    } )
}

module.exports = authenticateToken