const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/usercontroller')
const posts = require('./posts')
const friends = require('./friends')
const chats = require('./chats')

router.get('/:userid', user_controller.user_detail_get)

router.get('/', user_controller.user_list)

router.post('/', user_controller.user_create_post)

router.put('/:userid', user_controller.user_update_put)

router.delete('/:userid', user_controller.user_delete)

router.use('/:userid/posts', posts)

router.use('/:userid/friends', friends)

router.use('/:userid/chats', chats)

module.exports = router