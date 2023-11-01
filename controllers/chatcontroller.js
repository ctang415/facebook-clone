const Chat = require('../models/chat')
const User = require('../models/user')
const { body, validationResult } = require('express-validator')
const asyncHandler = require('express-async-handler')

exports.chat_detail_get = asyncHandler( async (req, res, next) => {
    const findChat = await Chat.findOne( {users: {$all: [req.body.userid, req.body.friendid ] }} )
    if (findChat === null) {
        res.status(404).json({error: "Chat not found."})
        return
    }
    const chat = await Chat.findOne( {users: {$all: [req.body.userid, req.body.friendid ] }} )
    res.status(200).json({chat: chat})
})

exports.chat_create_post = asyncHandler ( async (req, res, next) => {
    const findChat = await Chat.findOne( {users: {$all: [req.body.userid, req.body.friendid ] }} )
    if (findChat) {
        res.status(401).json({error: "Chat already exists."})
        return
    }
    const chat = new Chat (
        {
            users: [ req.body.userid, req.body.friendid]
        }
    )
    const newChat = await chat.save()
    const [ user, friendUser ] = await Promise.all (
        [
            User.findByIdAndUpdate(req.body.userid, {$push: { chats: newChat._id }}),
            User.findByIdAndUpdate(req.body.friendid, {$push: { chats: newChat._id }})
        ]
    ) 
    res.status(200).json({chat: newChat})
})
