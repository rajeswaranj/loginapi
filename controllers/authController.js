const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { signInSchema, signUpSchema } = require("../middlewares/validator")
const User = require("../models/usersModel")
const { doHash } = require("../utils/hashing")

exports.signIn = async (req, res) => {
    const { email, password } = req.body; 

    try { 
        const { error } = signInSchema.validate({ email, password });
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
 
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }
 
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: 'Invalid credentials.' });
        }

        if(!existingUser?.userRole){
            existingUser.userRole="employee"
        }
        
        const token = jwt.sign(
            { email: existingUser.email ,userRole:existingUser.userRole }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' } 
        );

        res.status(200).json({
            success: true,
            message: 'Sign-in successful.',
            token,
            user: {
                id: existingUser._id,
                email: existingUser.email,
                userName: existingUser.userName,
                userRole: existingUser?.userRole
            },
        });
    } catch (error) {
        console.error('Auth sign-in error:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

exports.signUp = async (req, res) => {
    const { userName, email, password} = req.body; 
    try { 
        if (!userName || !email || !password ) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const { error } = signUpSchema.validate({ userName, email, password });
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists.' });
        }
 
        const hashedPassword = await doHash(password, 12);
 
        const newUser = new User({
            userName,
            email,
            password: hashedPassword, 
        });

        await newUser.save();
 
        const token = jwt.sign(
            {email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            success: true,
            message: 'User registered successfully!',
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
                userName: newUser.userName, 
            },
        });
    } catch (error) {
        console.error('Auth sign-up error:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};