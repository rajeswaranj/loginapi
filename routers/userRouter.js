const express=require('express') 
const { createUserRole, getAllUsers, getAllUsersById } = require('../controllers/userController')
const { authenticate, authorize } = require('../middlewares/authmiddleware')

const router=express.Router()

router.put('/update-user',authenticate, authorize(['admin']),createUserRole)
router.get('/',authenticate,authorize(['admin']),getAllUsers)
router.get('/:id',authenticate,authorize(['admin']),getAllUsersById)

module.exports=router