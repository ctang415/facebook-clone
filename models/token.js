const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TokenSchema = new Schema (
    {
        token: { type: String },
        expiresAt: { type: Date, default: Date.now, expires: 3600 }
    }
)

module.exports = mongoose.model('Token', TokenSchema)