const express=require("express");
const cors=require("cors");
require("dotenv").config();
const app=express();
const cookieParser=require("cookie-parser");
const { connectDB } = require("./config/connectDB");
const userRouter = require("./routes/userRoutes");
const sellerRouter = require("./routes/sellerRoutes");
const connectCloudinary = require("./utils/cloudinary");
const cartRouter = require("./routes/cartRouter");
const addressRouter = require("./routes/addressRouter");
const orderRouter = require("./routes/orderRoutes");
const productRouter = require("./routes/productRoutes");
const { stripeWebhooks } = require("./controllers/orderControllers");

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/user",userRouter);
app.use("/api/seller",sellerRouter);
app.use("/api/cart",cartRouter);
app.use("/api/address",addressRouter);
app.use("/api/order",orderRouter);
app.use("/api/product",productRouter);

const PORT=process.env.PORT || 4001;

app.get("/",(req,res)=>{
    res.send("Api is working")
})
app.post("/stripe",express.raw({type:"application/json"}),stripeWebhooks);

connectCloudinary();
connectDB();
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})