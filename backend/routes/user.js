const express = require('express')
const zod = require('zod')
const jwt = require('jsonwebtoken')

const router = express.Router()
const { User, Account } = require('../db')
const { JWT_SECRET } = require('../config')
const { authMiddleware }  = require('../middleware')


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
    
    //set the user balance
    await Account.create({
        userId: userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.status(200).json({
        message: 'User created successfully',
        token: token,
    })
})


const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post('/signin', async function(req, res){
    const { success } = signinBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)

        res.json({
            token: token
        })
        return
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

//to update user info
router.put('/', authMiddleware, async function(req, res){
    const { success } = updateBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(
        req.body,
        {
            id: req.userId,
        },
    )

    res.json({
        message: "Updated successfully"
    })
})

//to get all the users
router.get('/bulk', async function (req, res){
    const filter = req.query.filter || ""

    const users = await User.find({
        $or: [
            {
                firstName: {
                   "$regex": filter
                }
            },
            {
                lastName: {
                    "$regex": filter
                }
            }
        ]
    })

    res.json({
        user: users.map(function(user){
           return {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }
        })
    })
}) 

module.exports = router;