const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { DateTime } = require('luxon')

const UserSchema = new Schema (
    {
        first_name: { type: String, min: 2, required: true },
        last_name: { type: String, min: 2, required: true },
        birthdate: { type: Date, min: '1900-01-01', required: true },
        email: { type: String, min: 5, max: 25, unique: true, required: true },
        password: { type: String, min: 3, required: true },
        friends: [ {type: Schema.Types.ObjectId, ref: 'Friend'} ],
        avatar: { type: String },
        posts: [ { type: Schema.Types.ObjectId, ref: 'Post'} ],
        privacy: {type: String, enum:["Public", "Friends", "Private"], default: "Public"}
    }, 
    {
        minimize: false,
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
)

UserSchema.virtual('full_name').get( function () {
    let fullName = `${this.first_name} ${this.last_name}`
    return fullName
})

UserSchema.virtual('birthdate_formatted').get(function () {
    return DateTime.fromJSDate(this.birthdate).toFormat('yyyy-MM-dd')
})

UserSchema.virtual('url').get(function () {
    return `/users/${this._id}`
})

module.exports = mongoose.model('User', UserSchema)