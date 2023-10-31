const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const { isValidObjectId } = require('mongoose')

exports.user_create_post = [
    body('email', "Email already exists").custom( async value => {
        const existingUser = await User.findOne( {email: value})
        if (existingUser) {
            throw new Error('Email already exists')
        }
    }),
    body('email', 'Email must be between 5-25 characters.').trim().isLength({min: 5, max: 25}).escape(),
    body('password', 'Password must be at least 3 characters.').trim().isLength({min: 3}).escape(),
    body('first_name', 'First name must be at least 2 characters').trim().isLength({min: 2}).escape(),
    body('last_name', 'Last name must be at least 2 characters.').trim().isLength({min: 2}).escape(),
    body('birthdate', 'Invalid birthdate').isISO8601().toDate(),
    body('birthdate', 'Must be at least 13 years old.').custom(async value => {
        let dob = new Date(value)
        let year = dob.getFullYear()
        let today = new Date();
        let age = today.getFullYear() - year
        if (age < 13) {
          throw new Error('Your age should be 13+')
        } 
    }),
    asyncHandler( async (req, res, next) => {
        const errors = validationResult(req);
        const user = new User (
            {
                email: req.body.email,
                password: req.body.password,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                birthdate: req.body.birthdate,
            }
        )
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
            return
        } else {
            await user.save()
            res.status(200).json({ user: user })
        }
    } )
]

exports.user_detail_get = asyncHandler (async (req, res, next) => {
    const user = await User.findById(req.params.userid)
    if (isValidObjectId(req.params.userid) === false) {
        res.status(400).json({error: "User does not exist"})
        return
    } 
    if (user === null) {
        res.status(400).json({error: 'User not found'})
        return
    } 
     res.status(200).json({user_detail: user})
})

exports.user_update_put = [
    body('password', 'Password must be at least 3 characters.').trim().isLength({min: 3}).escape(),
    body('first_name', 'First name must be at least 2 characters').trim().isLength({min: 2}).escape(),
    body('last_name', 'Last name must be at least 2 characters.').trim().isLength({min: 2}).escape(),
    asyncHandler ( async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()})
            return            
        }
 //       const updatedUser = await User.findByIdAndUpdate(req.params.userid, {'$set': {'first_name': }})
})
]

exports.user_delete = ( async (req, res, next) => {
    const user = await User.findById(req.params.userid)
    if (user === null) {
        res.status(400).json({error: "User does not exist."})
        return
    }
    await User.findByIdAndRemove(req.params.userid)
    res.status(200).json({success: true})
})

