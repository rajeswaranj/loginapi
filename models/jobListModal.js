const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "closed"],
    required: true,
  },
  referrals: {
    type: String,
    required: true,
    min: 0,
  }, 
});
 
const Jobs = mongoose.model('jobs', jobSchema);

module.exports = Jobs;