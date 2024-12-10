const express=require('express') 
const { createUserRole } = require('../controllers/userController')
const { authenticate, authorize } = require('../middlewares/authmiddleware')

const router=express.Router()

router.put('/',authenticate, authorize(['admin']),createUserRole)

module.exports=router