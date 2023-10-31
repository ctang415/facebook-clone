const express = require('express')
const router = express.Router()
const like_controller = require('../controllers/likecontroller')

router.post('/', like_controller.like_post)

router.delete('/', like_controller.like_delete)

module.exports = router