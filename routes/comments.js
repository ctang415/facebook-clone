const express = require('express')
const router = express.Router()
const comment_controller = require('../controllers/commentcontroller')
const authenticateToken = require('./authenticate')

router.post('/', authenticateToken, comment_controller.comment_create_post )

router.put('/:commentid', authenticateToken, comment_controller.comment_update )

router.delete('/:commentid', authenticateToken, comment_controller.comment_delete )

module.exports = router