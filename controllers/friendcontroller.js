const User = require('../models/user')
const Friend = require('../models/friend')
const { body, validationResult } = require('express-validator')
const asyncHandler = require('express-async-handler')

exports.friend_detail_get = asyncHandler( async (req, res, next) => {
    const searchFriend = await User.find({first_name : req.body.first_name}).select('-password')
    if (searchFriend === null) {
        res.status(404).json({error: "No matches found"})
        return
    }
    res.status(200).json({friends: searchFriend, success: true})
})

exports.friend_create_post = asyncHandler ( async (req, res, next) => {
        const friend = new Friend ({
            sender: req.body.id,
            users: [ req.body.id, req.body.friendid ]
        })
        const newFriend = await friend.save()
        const userFriend = await User.findByIdAndUpdate(req.body.friendid, {$push : {friends: newFriend._id}})
        const user = await User.findByIdAndUpdate(req.body.id, {$push: {friends: newFriend._id}})
        res.status(200).json({friend: newFriend, success: true})
    } )


exports.friend_update = asyncHandler( async (req, res, next) => {
    const friend = await Friend.findByIdAndUpdate(req.params.friendid, {status: "Friends"}, {new: true})
    res.status(200).json({friend: friend, success: true})
})

exports.friend_delete = asyncHandler ( async (req, res, next) => {
    const friend = await Friend.findById(req.params.friendid)
    if (friend === null) {
        res.status(404).json({error: "Friend not found."})
        return
    }
    const friendRequest = await Friend.findByIdAndRemove(req.params.friendid)
    const user = await User.findByIdAndUpdate(req.body.user, { $pull: {friends: req.params.friendid }})
    const userFriend = await User.findByIdAndUpdate(req.body.friend, {$pull: {friends: req.params.friendid} })
    res.status(200).json({success: true})

})

