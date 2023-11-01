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
        const message = new Message (
            {
                message: req.body.message,
                author: req.body.author
            }
        )
        const newMessage = await message.save()
        const updatedChat = await Chat.findByIdAndUpdate(req.body.chatid, {$push: {messages: newMessage._id }})
        res.status(200).json( {chat: updatedChat, success: true})
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
        const updatedMessage = await Message.findByIdAndUpdate(req.body.id, {message: req.body.message})
        res.status(200).json({ message: updatedMessage, success: true})
    })
]

exports.message_delete = asyncHandler( async (req, res, next) => {
    const message = await Message.findById(req.body.id)
    if (message === null) {
        res.status(404).json({error: "Message does not exist."})
        return
    }
    await Chat.findByIdAndUpdate(req.body.chatid, {$pull: {messages: message._id}})
    const removedMessage = await Message.findByIdAndRemove(req.body.id)
    res.status(200).json({success: true})
})