const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
    unique: true, 
    trim: true
  },
  skills: {
    type: [String], 
    required: true,
    validate: {
      validator: function (skillsArray) {
        return skillsArray.length > 0; 
      },
      message: 'A department must have at least one skill.'
    }
  }
}, { timestamps: true }); 
const Department = mongoose.model('department', departmentSchema);

module.exports = Department;
