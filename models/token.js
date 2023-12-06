const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TokenSchema = new Schema (
    {
        token: { type: String },
        createdAt: { type: Date, default: Date.now, expires: 1800 }
    }
)

module.exports = mongoose.model('Token', TokenSchema)