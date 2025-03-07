//importing the mongoose library 
const mongoose=require("mongoose");

//defining the user schema
const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            trim:true,
        },
        password:{
            type:String,
            required:true,
        },
        accountType:{
            type:String,
            enum:["User","Company"],
            required:true,
        },
        token : {
            type:String,
            
        },
        resetPasswordExpires:{
            type:Date,
        },
    }
);

module.exports = mongoose.model("user",userSchema);
