const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/usercontroller')
const posts = require('./posts')

router.get('/:userid', user_controller.user_detail_get)

router.post('/', user_controller.user_create_post)

router.put('/:userid', user_controller.user_update_put)

router.delete('/:userid', user_controller.user_delete)

router.use('/:userid/posts', posts)

module.exports = router