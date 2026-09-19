const express=require("express");
const { authSeller } = require("../middleware/authSeller");
const { addProduct, productList, getProductById, changeStock } = require("../controllers/productControllers");
const { upload } = require("../utils/multer");
const productRouter=express.Router();

productRouter.post("/add",upload.array(["images"]),authSeller,addProduct);
productRouter.get("/list",productList);
productRouter.get("/:id",authSeller,getProductById);
productRouter.post("/stock",authSeller,changeStock);

module.exports=productRouter;