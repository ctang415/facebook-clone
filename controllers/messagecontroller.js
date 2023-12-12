const Message = require('../models/message')
const Chat = require('../models/chat')
const { body, validationResult } = require('express-validator')
const asyncHandler = require('express-async-handler')
const io = require('../socket').get();

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
        const updatedChat = await Chat.findByIdAndUpdate(split[4], {$push: {messages: newMessage._id }})
        io.on('connection', (socket) => {
            socket.removeAllListeners()
            socket.on('new-message-add', () => {
                console.log('message sent')
                io.emit('get-message', newMessage)
            })
            socket.on('new-messenger-add', () => {
                console.log('messenger sent')
                io.emit('get-message-messenger', newMessage)
            })
          });
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
        const updatedMessage = await Message.findByIdAndUpdate(req.params.messageid, {message: req.body.message})
        res.status(200).json({ message: updatedMessage, success: true})
    })
]

exports.message_delete = asyncHandler( async (req, res, next) => {
    const split = req.baseUrl.split('/')
    const message = await Message.findById(req.params.messageid)
    if (message === null) {
        res.status(404).json({error: "Message does not exist."})
        return
    }
    await Chat.findByIdAndUpdate(split[4], {$pull: {messages: message._id}})
    const removedMessage = await Message.findByIdAndRemove(req.params.messageid)
    res.status(200).json({success: true})
})