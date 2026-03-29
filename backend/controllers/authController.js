const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const register=async(req,res)=>{
    const {name,email,password,role}=req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user=await User.create({name,email,password:hashedPassword,role});
        
        // Remove password hash from response
        const userResponse = user.toObject();
        delete userResponse.password;
        
        res.status(201).json(userResponse);
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
}

const login=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(401).json({message:"User not found"});
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(401).json({message:"Invalid credentials"});
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
    
    // Remove password hash from response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.status(200).json({token,user: userResponse});
}

const logout=async(req,res)=>{
    res.status(200).json({message:"Logout successful"});
}

module.exports={register,login,logout};