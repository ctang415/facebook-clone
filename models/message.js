const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { DateTime } = require('luxon');

const MessageSchema = new Schema (
    {
        message: {type: String, min: 1},
        timestamp: {type: Date, default: Date.now()},
        author: {type: Schema.Types.ObjectId, ref: 'User'},
        chat: { type: Schema.Types.ObjectId, ref: 'Chat'}
    }, 
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

MessageSchema.virtual('timestamp_formatted').get(function () {
    return DateTime.fromJSDate(this.timestamp).toFormat('yyyy-MM-dd')
});

MessageSchema.virtual('creation_time').get( function () {
    return DateTime.fromJSDate(this.timestamp).toFormat('hh:mm a')
});

module.exports = mongoose.model('Message', MessageSchema)