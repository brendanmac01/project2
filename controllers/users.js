// const bcrypt = require('bcrypt')
// const express = require('express')
// const userRouter = express.Router()
// const User = require('../models/users')

// // New
// userRouter.get('/new', (req, res) => {
//     res.render('users/new.ejs', {
//         currentUser: req.session.currentUser
//     })
// })

// // Create 
// userRouter.post('/', (req, res) => {
//     req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
//     const createdUser = new User(req.body)
//     createdUser.save().then(res.redirect("/"))
// })

// module.exports = userRouter