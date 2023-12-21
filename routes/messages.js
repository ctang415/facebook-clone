const message_controller = require('../controllers/messagecontroller')
const express = require('express')
const router = express.Router()
const authenticateToken = require('./authenticate')

/*
function initialize (socket, router) {

    socket.on('new-message-add', (msg) => {
        console.log('message sent')
        io.emit('get-message', msg)
    })
    socket.on('new-messenger-add', (msg) => {
        console.log('messenger sent')
        io.emit('get-message-messenger', msg)
    })
    
    router.post('/', authenticateToken, message_controller.message_create_post)
}
*/
router.post('/', authenticateToken, message_controller.message_create_post)

router.put('/:messageid', authenticateToken, message_controller.message_update)

router.delete('/:messageid', authenticateToken, message_controller.message_delete)

module.exports = router