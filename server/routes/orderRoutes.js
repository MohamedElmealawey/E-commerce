const express=require("express");
const { authUser } = require("../middleware/authUser");
const { PlaceOrderCOD, getUserOrders, getAllOrders, PlaceOrderStripe } = require("../controllers/orderControllers");
const { authSeller } = require("../middleware/authSeller");
const orderRouter=express.Router();

orderRouter.post("/cod",authUser,PlaceOrderCOD);
orderRouter.get("/user",authUser,getUserOrders);
orderRouter.get("/seller",authSeller,getAllOrders);
orderRouter.post("/stripe",authUser,PlaceOrderStripe);

module.exports=orderRouter;