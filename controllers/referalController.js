const mongoose = require('mongoose');
const Referrals = require('../models/referralModal');
 

exports.getReferrals = async (req, res) => {
    console.log("getReferrals")
    const referrals = await Referrals.find({})
    console.log(referrals)
    return res.status(200).json({ referrals: referrals });
};

exports.getReferralById = async(req, res) => {
    const id =new mongoose.Types.ObjectId(req.params.id);
 
    const referral = await Referrals.findById(id);

    if (!referral) {
        return res.status(404).json({ message: "Referral not found" });
    } 
    res.status(200).json(referral);
};