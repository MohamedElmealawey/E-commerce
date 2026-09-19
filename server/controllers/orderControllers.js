const Order = require("../models/orderSchema");
const Product = require("../models/productSchema");
const stripe=require("stripe");
const User = require("../models/userSchema");

exports.PlaceOrderCOD=async(req,res)=>{
    try{
        const {userId,items,address}=req.body;
        if(!address || items.length===0){
            return res.status(400).json({
                success:false,
                message:"Invalid Data"
            })
        }
        let amount=await items.reduce(async(acc,item)=>{
            const product=await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        },0);

        amount+=Math.floor(amount*0.02);
        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType:"COD"
        })

        return res.status(200).json({
            success:true,
            message:"Order Placed Successfully"
        })
    }catch(error){
        console.log(error.message)
    }
}

exports.PlaceOrderStripe=async(req,res)=>{
    try{
        const {userId,items,address}=req.body;
        const {origin}=req.headers;
        if(!address || items.length===0){
            return res.status(400).json({
                success:false,
                message:"Invalid Data"
            })
        }
        let productData=[];
        let amount=await items.reduce(async(acc,item)=>{
            const product=await Product.findById(item.product);
            productData.push({
                name:product.name,
                price:product.price,
                quantity:item.quantity
            })
            return (await acc) + product.offerPrice * item.quantity;
        },0);

        amount+=Math.floor(amount*0.02);
        const order=await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType:"Online"
        })

        const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY);

        const line_items=productData.map((item)=>{
            return{
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:item.name
                    },
                    unit_amount:Math.floor(item.price + item.price * 0.02) * 100,
                },
                quantity:item.quantity
            }
        })
        const session=await stripeInstance.checkout.sessions.create({
            line_items,
            mode:"payment",
            success_url:`${origin}/loader?next=my-orders`,
            cancel_url:`${origin}/cart`,
            metadata:{
                orderId:order._id.toString(),
                userId
            }
        })

        return res.status(200).json({
            success:true,
            message:"Order Placed Successfully",
            url:session.url
        })
    }catch(error){
        console.log(error.message)
    }
}

exports.stripeWebhooks=async(req,res)=>{
    const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY);

    const sig=req.headers["stripe-signature"];

    let event;
    try{
         event=stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET

        )
    }catch(error){
        console.log(error.message);
    }

    switch(event.type){
        case "payment_intent_successed":{
            const paymentIntent=event.data.object;
            const paymentIntentId=paymentIntent.id;

            const session=await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId
            })

            const {orderId,userId}=session.data[0].metadata;
            await Order.findByIdAndUpdate(orderId,{isPaid:true});
            await User.findByIdAndUpdate(userId,{cartItems:{}});
            break;
        }
        case "payment_intent_failed":{
            const paymentIntent=event.data.object;
            const paymentIntentId=paymentIntent.id;

            const session=await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId
            })

            const {orderId}=session.data[0].metadata;
            await Order.findByIdAndDelete(orderId);
            break;
        }default:{
            break;
        }
    }
    res.json({received:true})
}

exports.getUserOrders=async(req,res)=>{
    try{
        const userId=req.userId;
        const orders=await Order.find({
            userId,
            $or:[{paymentType:"COD"},{isPaid:true}]
        }).populate("items.product address").sort({created:-1});

        return res.status(200).json({
            success:true,
            orders
        })
    }catch(error){
        console.log(error.message)
    }
}

exports.getAllOrders=async(req,res)=>{
    try{
        const orders=await Order.find({
            $or:[{paymentType:"COD"},{isPaid:true}]
        }).populate("items.product address").sort({created:-1});

        return res.status(200).json({
            success:true,
            orders
        })
    }catch(error){
        console.log(error.message)
    }
}