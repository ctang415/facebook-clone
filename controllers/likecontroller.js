const Post = require('../models/post');
const asyncHandler = require('express-async-handler');

exports.like_post =  asyncHandler (async (req, res, next) => {
    const split = req.baseUrl.split('/');
    const post = await Post.findById(split[4]);
    if (post === null) {
        res.status(404).json({error: "Post does not exist."});
        return
    }
    const updatedPost = await Post.findByIdAndUpdate(split[4], { $push: { likes: split[2]}});
    res.status(200).json({post: updatedPost, success: true});
});

exports.like_delete = asyncHandler (async (req, res, next) => {
    const split = req.baseUrl.split('/');
    const post = await Post.findById(split[4]);
    if (post === null) {
        res.status(404).json({error: "Post does not exist."});
        return
    }
    const updatedPost = await Post.findByIdAndUpdate(split[4], { $pull: { likes: split[2]}}, {new: true});
    res.status(200).json({post: updatedPost, success: true});
});