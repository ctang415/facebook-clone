const Chat = require('../models/chat')
const User = require('../models/user')
const Message = require('../models/message')
const { body, validationResult } = require('express-validator')
const asyncHandler = require('express-async-handler')

exports.chat_detail_get = asyncHandler( async (req, res, next) => {
    const findChat = await Chat.findById(req.params.chatid)
    if (findChat === null) {
        res.status(404).json({error: "Chat not found."})
        return
    }
    const chat = await Chat.findById(req.params.chatid).populate( [{path: 'messages', populate: { path: 'author', select: '-password'}}, {path: 'users', select: '-password'} ])
    res.status(200).json({chat: chat})
})

exports.chat_create_post = asyncHandler ( async (req, res, next) => {
    const split = req.baseUrl.split('/')

    const findChat = await Chat.findOne( {users: {$all: [split[2], req.body.friendid ] }} )
    if (findChat) {
        res.status(401).json({error: "Chat already exists."})
        return
    }
    const chat = new Chat (
        {
            users: [ split[2], req.body.friendid]
        }
    )
    const newChat = await chat.save()
    const [ user, friendUser ] = await Promise.all (
        [
            User.findByIdAndUpdate(split[2], {$push: { chats: newChat._id }}),
            User.findByIdAndUpdate(req.body.friendid, {$push: { chats: newChat._id }})
        ]
    ) 
    res.status(200).json({chat: newChat, success: true})

})

exports.chat_delete = asyncHandler (async (req, res, next) => {
    const messagesInChat = await Message.find({ chat: req.params.chatid})
    const split = req.baseUrl.split('/')
    const chat = await Chat.findById(req.params.chatid)
    if (chat === null) {
        res.status(404).json({error: "Chat does not exist."})
        return
    }
    if ( messagesInChat.length > 0 ) {
        const messages = messagesInChat.map(x => x.id)
        await Message.deleteMany({_id: { $in: messages}})
    }
    const [ deletePost, updatedUser ] = await Promise.all( [
        User.findByIdAndUpdate(split[2], {$pull: {chats: req.params.chatid}}, {new: true}),
        User.findByIdAndUpdate(req.body.friendid, {$pull : {chats: req.params.chatid}}, {new: true}),
        Chat.findByIdAndRemove(req.params.chatid)
    ])
    res.status(200).json({success: true})
})
