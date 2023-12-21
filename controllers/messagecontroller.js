const Message = require('../models/message')
const Chat = require('../models/chat')
const { body, validationResult } = require('express-validator')
const asyncHandler = require('express-async-handler')

exports.message_create_post = [
    body('message', "Message must not be blank.").trim().isLength({min: 1}).escape(),
    asyncHandler( async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(401).json({errors: errors.array()})
            return
        }
        const split = req.baseUrl.split('/')
        const message = new Message (
            {
                message: req.body.message,
                timestamp: req.body.timestamp,
                author: split[2],
                chat: split[4]
            }
        )
        const newMessage = await message.save().then( x => x.populate( {path: 'author', select: '-password'}))
        const updatedChat = await Chat.findByIdAndUpdate(split[4], {$push: {messages: newMessage._id }}, {new: true}).then( x => x.populate( [{path: 'users', select: '-password'}, {path: 'messages', populate: {path: 'author', select: '-password'}} ]) )             
        
        res.status(200).json( {chat: updatedChat, message: newMessage, success: true})
    })
]

exports.message_update = [
    body('message', "Message must not be blank.").trim().isLength({min: 1}).escape(),
    asyncHandler( async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(401).json({errors: errors.array()})
            return
        }
        const split = req.baseUrl.split('/')
        const updatedMessage = await Message.findByIdAndUpdate(req.params.messageid, {message: req.body.message}, {new: true})
        const chat = await Chat.findById(split[4]).then( x => x.populate( [{path: 'users', select: '-password'}, {path: 'messages', populate: {path: 'author', select: '-password'}} ]) )

        res.status(200).json({ message: updatedMessage, chat: chat, success: true})
    })
]

exports.message_delete = asyncHandler( async (req, res, next) => {
    const split = req.baseUrl.split('/')
    const message = await Message.findById(req.params.messageid)
    if (message === null) {
        res.status(404).json({error: "Message does not exist."})
        return
    }
    const chat = await Chat.findByIdAndUpdate(split[4], {$pull: {messages: message._id}}, {new: true}).then( x => x.populate( [{path: 'users', select: '-password'}, {path: 'messages', populate: {path: 'author', select: '-password'}} ]) )
    const removedMessage = await Message.findByIdAndRemove(req.params.messageid)

    res.status(200).json({success: true, chat: chat, message: req.params.messageid})
})