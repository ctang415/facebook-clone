const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { DateTime } = require('luxon')

const CommentSchema = new Schema (
    {
        message: {type: String, min: 1, required: true},
        timestamp: {type: Date, default: Date.now()},
        author: {type: Schema.Types.ObjectId, ref: 'User'},
        post: {type: Schema.Types.ObjectId, ref: 'Post'}
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
)
CommentSchema.virtual('url').get(function() {
    return `/comments/${this._id}`
})

CommentSchema.virtual('timestamp_formatted').get(function () {
    return DateTime.fromJSDate(this.timestamp).toFormat('yyyy-MM-dd')
})

module.exports = mongoose.model('Comment', CommentSchema)
