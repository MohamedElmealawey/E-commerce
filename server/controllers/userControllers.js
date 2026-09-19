const User = require("../models/userSchema");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

exports.register=async(req,res)=>{
    try{
        const {name,email,password}=req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"Fields must be filled"
            })
        }
        const userFound=await User.findOne({email});
        if(userFound){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        const user=await User.create({
            name,
            email,
            password
        })
        const token=jwt.sign({id:user._id},process.env.TOKEN_PASS,{
            expiresIn:"7d"
        })
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json({
            success:true,
            message:"User registiration success",
            token,
            user:{
                email:user.email,
                name:user.name
            }
        })
    }catch(error){
        console.log(error.message);
    }
}

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"Fields must be filled"
            })
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            })
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            })
        }
        const token=jwt.sign({id:user._id},process.env.TOKEN_PASS,{
            expiresIn:"7d"
        })
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json({
            success:true,
            message:"User login success",
            user:{
                name:user.name,
                email:user.email
            }
        })
    }catch(error){
        console.log(error.message);
    }
}

exports.logout=async(req,res)=>{
    try{
        res.clearCookie("token",{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:process.env.NODE_ENV === "production" ? 'none' : 'strict',
        });
        return res.status(200).json({
            success:true,
            message:"Logged Out"
        })
    }catch(error){
        console.log(error.message);
    }
}