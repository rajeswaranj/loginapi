const express=require('express')
const { signIn, signUp } = require('../controllers/authController')  

const router=express.Router()
//anyone access this api
router.post('/signin',signIn)
router.post('/signup',signUp)

// router.get('/jobs',getUsersByRole)
// router.get('/jobs/id',getUsersByRole)

// //authentication and autherization needed this
// router.get('/referels',)//login + hr  or admin
// router.get('/referels/id',getUsersByRole)//login + hr or admin
// router.get('/users/all',getUsersByRole) //login user only access this && login user role admin only access this.
// router.get('/users/id',getUsersByRole)
module.exports=router
