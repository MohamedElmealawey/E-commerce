const Address = require("../models/addressSchema");

exports.addAddress=async(req,res)=>{
    try{
        const {address,userId}=req.body;
        await Address.create({...address,userId});
        return res.status(200).json({
            success:true,
            message:"Address added successfully"
        })
    }catch(error){
        console.log(error.message);
    }
}

exports.getAddress=async(req,res)=>{
    try{
        const {userId}=req.body;
        const addresses=await Address.find({userId});
        return res.status(200).json({
            success:true,
            addresses
        })
    }catch(error){
        console.log(error.message);
    }
}