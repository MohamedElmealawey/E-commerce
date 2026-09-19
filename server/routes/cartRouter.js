const express=require("express");
const { authUser } = require("../middleware/authUser");
const { updateCart } = require("../controllers/cartControllers");
const cartRouter=express.Router();

cartRouter.post("/update",authUser,updateCart);


module.exports=cartRouter;