require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/database");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("./config/cors");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use("/api/auth", require("./routes/authRoutes"));

mongoose.connection.once("open", () => {
  console.log("connection to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
