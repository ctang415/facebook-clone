const express = require('express')
const router = express.Router()
const friend_controller = require('../controllers/friendcontroller')

router.get('/', friend_controller.friend_detail_get)

router.post('/', friend_controller.friend_create_post)

router.put('/:friendid', friend_controller.friend_update)

router.delete('/:friendid', friend_controller.friend_delete)

module.exports = router