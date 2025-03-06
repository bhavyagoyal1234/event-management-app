//instance of express
const express=require("express");
const app=express();
const database=require("./config/database");
const mongoose=require("mongoose");

const dotenv=require("dotenv").config();

//PORT NO at which server is running 
const PORT=process.env.PORT || 4000;
database();
app.use(express.json());

//starting server 
mongoose.connection.once("open", () => {
    console.log("connection to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });

