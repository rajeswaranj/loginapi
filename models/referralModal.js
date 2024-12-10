const mongoose = require('mongoose');

const referralSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Hired", "In Process", "Rejected"],
    required: true,
  },
  bonus: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    required: true,
  },
});
 
const Referrals = mongoose.model('referrals', referralSchema);

module.exports = Referrals;