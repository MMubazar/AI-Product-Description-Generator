const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const productRoutes = require("./routes/products.routes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/ai-products")
.then(()=>{
    console.log("MongoDB Connected");
})
.catch(err=>console.log(err));

app.use("/api/products", productRoutes);

app.listen(5000, ()=>{
    console.log("Server running on port 5000");
});