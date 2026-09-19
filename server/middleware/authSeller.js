const jwt=require("jsonwebtoken");

exports.authSeller=async(req,res,nxt)=>{
    try{
        const {sellerToken}=req.cookies;
        if(!sellerToken){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        const tokenDecode=jwt.verify(sellerToken,process.env.TOKEN_PASS);
        if(tokenDecode.email===process.env.SELLER_EMAIL){
            nxt();
        }else{
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
    }catch(error){
        console.log(error.message)
    }
}