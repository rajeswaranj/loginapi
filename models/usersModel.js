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
      required: true
    },})

    const User = mongoose.model('userData', UserSchema)
    module.exports = User