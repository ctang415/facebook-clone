require('dotenv').config()
const jwt = require('jsonwebtoken')

function authenticateToken (req, res, next) {
    const token = req.cookies.token
    if (token == null) return res.status(401).json({error: 'Token does not exist'})
    jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, (err, user) => {
       if (err) return res.status(403).json({error: err})
       req.user = user
       req.token = token
       console.log('authenticate')
       return next()
    } )
}

module.exports = authenticateToken