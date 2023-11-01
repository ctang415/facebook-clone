const express = require('express')
const router = express.Router()
const comment_controller = require('../controllers/commentcontroller')

router.post('/', comment_controller.comment_create_post )

router.put('/:commentid', comment_controller.comment_update )

router.delete('/:commentid', comment_controller.comment_delete )

module.exports = router