const message_controller = require('../controllers/messagecontroller')
const express = require('express')
const router = express.Router()
const authenticateToken = require('./authenticate')

router.post('/', authenticateToken, message_controller.message_create_post)

router.put('/:messageid', authenticateToken, message_controller.message_update)

router.delete('/:messageid', authenticateToken, message_controller.message_delete)

module.exports = router