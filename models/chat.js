const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatSchema = new Schema (
    {
        users: [ {type: Schema.Types.ObjectId, ref: 'User'} ],
        messages: [ {type: Schema.Types.ObjectId, ref: 'Message'}]
    },
    {
        minimize: false,
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
)


ChatSchema.virtual('url').get(function() {
    return `/chats/${this._id}`
})

module.exports = mongoose.model('Chat', ChatSchema)