const express = require('express')
const router = express.Router()
const chat_controller = require('../controllers/chatcontroller')
const messages = require('../routes/messages')

router.get('/:chatid', chat_controller.chat_detail_get)

router.post('/', chat_controller.chat_create_post)

router.delete('/:chatid', chat_controller.chat_delete)

router.use('/:chatid/messages', messages)

module.exports = router