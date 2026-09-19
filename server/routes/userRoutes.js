const express=require("express");
const { register, login, logout } = require("../controllers/userControllers");
const { authUser, isAuth } = require("../middleware/authUser");
const userRouter=express.Router();

userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.get("/is-auth",authUser,isAuth);
userRouter.get("/logout",authUser,logout);

module.exports=userRouter;