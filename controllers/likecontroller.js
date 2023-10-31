const Post = require('../models/post')
const asyncHandler = require('express-async-handler')

exports.like_post =  asyncHandler (async (req, res, next) => {
    const post = await Post.findById(req.body.id)
    if (post === null) {
        res.status(404).json({error: "Post does not exist."})
        return
    }
    const updatedPost = await Post.findByIdAndUpdate(req.body.id, { $push: { likes: req.body.user}} )
    res.status(200).json({post: updatedPost, success: true})
})

exports.like_delete = asyncHandler (async (req, res, next) => {
    const post = await Post.findById(req.body.id)
    if (post === null) {
        res.status(404).json({error: "Post does not exist."})
        return
    }
    const updatedPost = await Post.findByIdAndUpdate(req.body.id, { $pull: { likes: req.body.user}}, {new: true} )
    res.status(200).json({post: updatedPost, success: true})
})