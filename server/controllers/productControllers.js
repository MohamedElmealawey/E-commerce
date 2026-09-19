const Product = require("../models/productSchema");

const cloudinary=require("cloudinary").v2;

exports.addProduct=async(req,res)=>{
    try{
        let productData=JSON.parse(req.body.productData);
        const images=req.files

        let imagesUrl=await Promise.all(
            images.map(async(item)=>{
                let result=await cloudinary.uploader.upload(item.path,
                    {resource_type:'image'});
                    return result.secure_url;
            })
        )

        await Product.create({...productData,images:imagesUrl});

        return res.status(200).json({
            success:true,
            message:"Product Added"
        })
    }catch(error){
        console.log(error.message);
    }
}

exports.productList=async(req,res)=>{
    try{
        const products=await Product.find({});

        if(products.length===0){
            return res.status(400).json({
                success:false,
                message:"No products"
            })
        }

        return res.status(200).json({
            success:true,
            products
        })
    }catch(error){
        console.log(error.message);
    }
}

exports.getProductById=async(req,res)=>{
    try{
        const {id}=req.body;

        const product=await Product.findOne({_id:id});

        if(!product){
            return res.status(400).json({
                success:false,
                messsage:"No product with this id"
            })
        }

        return res.status(200).json({
            success:true,
            product
        })
    }catch(error){
        console.log(error.message);
    }
}

exports.changeStock=async(req,res)=>{
    try{
        const {id,inStock}=req.body;

        const product=await Product.findByIdAndUpdate(id,{inStock});

        return res.status(200).json({
            success:true,
            message:"Stock Updated"
        })
    }catch(error){
        console.log(error.message);
    }
}