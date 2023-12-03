const express = require('express')
const router = express.Router()
const post_controller = require('../controllers/postcontroller')
const likes = require('../routes/likes')
const comments = require('../routes/comments')
const authenticateToken = require('./authenticate')

router.get('/:postid', authenticateToken, post_controller.post_get_detail)

router.post('/', authenticateToken, post_controller.post_create_post)

router.put('/:postid', authenticateToken, post_controller.post_update)

router.delete('/:postid', authenticateToken, post_controller.post_delete)

router.use('/:postid/likes', likes)

router.use('/:postid/comments', comments)

module.exports = router