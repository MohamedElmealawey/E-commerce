const User = require("../models/userSchema");

exports.updateCart=async(req,res)=>{
    try{
        const {userId,cartItems}=req.body;

        await User.findByIdAndUpdate(userId,{cartItems},{new:true});
        return res.status(200).json({
            success:true,
            message:"Cart Updated"
        })
    }catch(error){
        console.log(error.message);
    }
}