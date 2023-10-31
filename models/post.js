const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { DateTime } = require('luxon')

const PostSchema = new Schema (
    {
        message: {type: String, min: 1, required: true},
        author: {type: Schema.Types.ObjectId, ref: 'User'},
        timestamp: {type: Date, default: Date.now()},
        comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
        likes: [{type: Schema.Types.ObjectId, ref: 'User'}]
    },
    {
        minimize: false,
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
)

PostSchema.virtual('timestamp_formatted').get(function () {
    return DateTime.fromJSDate(this.timestamp).toFormat('yyyy-MM-dd')
})

PostSchema.virtual('url').get(function () {
    return `/posts/${this._id}`
})

module.exports = mongoose.model('Post', PostSchema)