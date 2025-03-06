const mongoose=require("mongoose");
require("dotenv").config();

const connectwithdb=()=>{
   
        mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        .then( ()=> console.log("db conncection successfully"))
        .catch(()=>console.log("db facing connection issue"))
    }
   

module.exports=connectwithdb;