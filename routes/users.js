const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/usercontroller')
const posts = require('./posts')
const friends = require('./friends')
const chats = require('./chats')
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './react/src/assets')
    },
    filename: function( req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5 }})


router.get('/:userid', user_controller.user_detail_get)

router.get('/', user_controller.user_list)

router.post('/', user_controller.user_create_post)

router.put('/:userid', user_controller.user_update_put)

router.put('/:userid/avatar', upload.single('avatar'), user_controller.user_update_put_avatar)

router.put('/:userid/cover', upload.single('cover'), user_controller.user_update_put_cover)

router.put('/:userid/information', user_controller.user_update_put_information)

router.delete('/:userid', user_controller.user_delete)

router.use('/:userid/posts', posts)

router.use('/:userid/friends', friends)

router.use('/:userid/chats', chats)

module.exports = router