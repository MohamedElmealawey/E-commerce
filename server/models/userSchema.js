const { default: mongoose } = require("mongoose");
const bcrypt=require("bcrypt");

const userSchema=new mongoose.Schema(({
    name:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true,
        unique:true
    },password:{
        type:String,
        required:true
    },
    cartItems:{
        type:Object,
        default:{}
    }
}),{timestamps:true,minimize:false});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw error;
    }
});

const User=mongoose.model("User",userSchema);

module.exports=User;