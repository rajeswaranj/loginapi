const {  createUserRoleSchema } = require("../middlewares/validator")
const User = require("../models/usersModel") 
const mongoose = require('mongoose');

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

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        
        if (!users || users.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'No users found.' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Fetched all users successfully.',
            users, 
        });
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error. Please try again later.' 
        });
    }
};

exports.getAllUsersById = async (req, res) => {
    try {
        const { id } = req.params;
 
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid User ID format.' 
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'user not found.' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Fetched the job successfully.',
            user,
        });
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error. Please try again later.' 
        });
    }
};
