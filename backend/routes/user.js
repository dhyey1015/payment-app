const express = require('express')
const zod = require('zod')
const jwt = require('jsonwebtoken')

const router = express.Router()
const { use } = require('.')
const { User } = require('../db')
const { JWT_SECRET } = require('../config')


const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})

router.post('/signup', async function(req, res){
    
    // proper input check
    const { success } = signupBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Email already taken/Incorrect Inputs"
        })
    }
    //user exist check
    const existingUser = User.find({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message: "Email already taken/Incorrect Inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    const userId = req.body._id;
    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.status(200).json({
        message: 'User created successfully',
        token: token,
    })
})