const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatSchema = new Schema (
    {
        messages: [ {type: Schema.Types.ObjectId, ref: "Message"}]
    },
    {
        minimize: false,
    }
)

module.exports = mongoose.model("Chat", ChatSchema)