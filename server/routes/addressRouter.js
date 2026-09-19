const express=require("express");
const { authUser } = require("../middleware/authUser");
const { addAddress, getAddress } = require("../controllers/addressControllers");
const addressRouter=express.Router();

addressRouter.post("/add",authUser,addAddress);
addressRouter.post("/get",authUser,getAddress);

module.exports=addressRouter;