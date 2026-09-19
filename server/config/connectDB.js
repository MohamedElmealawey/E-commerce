const { default: mongoose } = require("mongoose");

exports.connectDB=async()=>{
    try{
        await mongoose.connect(process.env.DB_URL).then(()=>{
            console.log("Database connection success")
        }).catch((error)=>{
            console.log(error.message);
        })
    }catch(error){
        console.log(error.message);
    }
}