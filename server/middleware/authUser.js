const jwt=require("jsonwebtoken");
const User = require("../models/userSchema");

exports.authUser = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized please login!"
            });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_PASS);

        if (!decoded.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized please login!"
            });
        }

        req.userId = decoded.id;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({
            success: false,
            message: "Unauthorized. Invalid or expired token"
        });
    }
};

exports.isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided. Unauthorized"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id || decoded.userId;
        
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Invalid token structure"
            });
        }

        const user = await User.findById(userId).select("-password");
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        req.user = user;
        req.userId = userId;
        next();
        
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized. Invalid token"
        });
    }
};