const Post = require('../models/post');
const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.comment_create_post = [
    body('message', 'Message must not be blank.').trim().isLength({min: 1}).escape(),
    asyncHandler( async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(401).json({errors: errors.array()});
            return
        }
        const comment = new Comment (
            {
                author: req.body.author,
                message: req.body.message,
                post: req.body.id
            }
        );
        const newComment = await comment.save();
        const updatedPost = await Post.findByIdAndUpdate(req.body.id, {$push: {comments: newComment._id}});
        res.status(200).json({comment: comment, success: true});
    })
]

exports.comment_update = [
    body('message', 'Message must not be blank.').trim().isLength({min: 1}).escape(),
    asyncHandler( async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(401).json({errors: errors.array()});
            return
        }
        const updatedComment = await Comment.findByIdAndUpdate(req.params.commentid, {message: req.body.message});
        res.status(200).json({comment: updatedComment, success: true});
    })
]

exports.comment_delete = asyncHandler (async (req, res, next) => {
    const split = req.baseUrl.split('/');
   
    const comment = await Comment.findById(req.params.commentid);
    if (comment === null) {
        res.status(404).json({error: "Comment does not exist."});
        return
    }
    const [ updatedPost, removedComment ] = await Promise.all (
        [
            Post.findByIdAndUpdate(split[4], {$pull: {comments: comment._id}}, {new: true}),
            Comment.findByIdAndRemove(req.params.commentid)
        ]
    )
    res.status(200).json({success:true});
});