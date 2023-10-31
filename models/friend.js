const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FriendSchema = new Schema (
    {
        users: [{type: Schema.Types.ObjectId, ref: "User"}],
        status: {type: String, enum:["Pending", "Friends"], default: "Pending"}
    },
    {
        minimize: false,
    }
)

module.exports = mongoose.model("Friend", FriendSchema)