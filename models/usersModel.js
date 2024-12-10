const mongoose = require('mongoose')
const UserSchema = mongoose.Schema(
  {
    userId: String, 
    email: {
      type: String,
      required: true
    },
    password: {
      type: String, 
    },
    userName:{
      type: String, 
    }, 
    userRole:{
      type: String, 
    },
  
  })

    const User = mongoose.model('User', UserSchema)
    module.exports = User