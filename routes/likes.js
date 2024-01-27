const express = require('express');
const router = express.Router();
const like_controller = require('../controllers/likecontroller');
const authenticateToken = require('./authenticate');

router.post('/', authenticateToken, like_controller.like_post);

router.delete('/', authenticateToken, like_controller.like_delete);

module.exports = router