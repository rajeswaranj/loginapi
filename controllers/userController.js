const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { signInSchema, signUpSchema, createUserRoleSchema } = require("../middlewares/validator")
const User = require("../models/usersModel")
const { doHash } = require("../utils/hashing")

exports.createUserRole = async (req, res) => {
    const { email, userRole } = req.body;

    try { 
        const { error } = createUserRoleSchema.validate({ email, userRole });
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
 
        const updatedUser = await User.findOneAndUpdate(
            { email },  
            { $set: { userRole } },  
            { new: true }  
        );
 
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }
 
        res.status(200).json({
            success: true,
            message: 'User role updated successfully.',
            user: {
                id: updatedUser._id,
                email: updatedUser.email,
                userRole: updatedUser.userRole,
            },
        });
    } catch (error) {
        console.error('Create user role error:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};
