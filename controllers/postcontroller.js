const Post = require('../models/post')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const { isValidObjectId } = require('mongoose')
const User = require('../models/user')

exports.post_create_post = [
    body('message', 'Message must not be blank.').trim().isLength({min: 1}).escape(),
    asyncHandler (async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(401).json({errors: errors.array()})
            return
        }
        const post = new Post ({
            message: req.body.message,
            author: req.body.author
        })
        let newPost = await post.save()
        const updatedUser = await User.findByIdAndUpdate(req.body.author, {$push: {posts: newPost._id}})
        res.status(200).json({post: newPost, success: true})
    })
]

exports.post_get_detail = asyncHandler (async (req, res, next) => {
    const post = await Post.findById(req.params.postid)
    if (post === null) {
        res.status(404).json({error: "Post does not exist."})
        return
    }
    res.status(200).json({post: post})
})

exports.post_update = [
    body('message', 'Message must not be blank.').trim().isLength({min: 1}).escape(),
    asyncHandler (async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(401).json({errors: errors.array()})
            return
        }
        const updatedPost = await Post.findByIdAndUpdate(req.params.postid, {message: req.body.message})
        res.status(200).json({post: updatedPost})
    })
]

exports.post_delete = asyncHandler (async (req, res, next) => {
    //const post = await Post.findById(req.params.postid)
    const post = await Post.findById(req.body.postid)
    
    if (post === null) {
        res.status(404).json({error: "Post does not exist."})
        return
    }
    // await Post.findByIdAndRemove(req.params.postid)
    
    await Post.findByIdAndRemove(req.body.postid)
    // const updatedUser = await User.findByIdAndUpdate(req.body.author, {$pull: {posts: req.params.postid}}, {new: true} )
    const updatedUser = await User.findByIdAndUpdate(req.body.author, {$pull: {posts: req.body.postid}}, {new: true} )
    
    res.status(200).json({success: true})
})
