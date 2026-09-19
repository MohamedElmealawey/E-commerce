const jwt=require("jsonwebtoken");

exports.sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials" 
            });
        }
        if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASS) {
            const token = jwt.sign(
                { email }, 
                process.env.TOKEN_PASS, 
                { expiresIn: "7d" }
            );

            res.cookie("sellerToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.status(200).json({
                success: true,
                message: "Logged In Successfully"
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
exports.isSellerAuth=async(req,res)=>{
    try{
        return res.json({success:true})
    }catch(error){
        console.log(error.message);
    }
}

exports.sellerLogout=async(req,res)=>{
    try{
        res.clearCookie("sellerToken",{
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