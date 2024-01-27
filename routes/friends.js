const express = require('express');
const router = express.Router();
const friend_controller = require('../controllers/friendcontroller');
const authenticateToken = require('./authenticate');

router.get('/', authenticateToken, friend_controller.friend_detail_get);

router.post('/', authenticateToken, friend_controller.friend_create_post);

router.put('/:friendid', authenticateToken, friend_controller.friend_update);

router.delete('/:friendid', authenticateToken, friend_controller.friend_delete);

module.exports = router