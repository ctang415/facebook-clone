const message_controller = require('../controllers/messagecontroller')
const express = require('express')
const router = express.Router()

router.post('/', message_controller.message_create_post)

router.put('/:messageid', message_controller.message_update)

router.delete('/:messageid', message_controller.message_delete)

module.exports = router