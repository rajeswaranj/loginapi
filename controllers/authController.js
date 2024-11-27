const { signInSchema } = require("../middlewares/validator")
const User = require("../models/usersModel")
const { doHash } = require("../utils/hashing")

exports.signIn=async(req,res)=>{
    const {email,password}=req.body
    console.log("password",password)
    try {
       const {error,value}= signInSchema.validate({email,password})
        if(error){
            return res.status(401).json({success:false,message:error.details[0].message})
        }
        const exitingUser=await User.findOne({email})
        if(exitingUser){
            return res.status(401).json({success:false,message:'user already exist'})  
        }
       const hashedPassword=await doHash(password,12)
       const newUser=new User({email,password:hashedPassword})
       const result=await newUser.save()
       result.password=undefined;
       res.status(201).json({success:true,message:"Use Created successfuly",result})
       return result;
    } catch (error) {
        console.log("auth sign in error",error)
    }
}