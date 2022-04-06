const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const adminRouter = require("./routes/admin.route")
const path=require("path")

// const multer=require("multer");
const cors = require("cors");
const { path } = require("express/lib/application");

const app = express();
app.use(cors());

mongoose.connect("mongodb+srv://lucky:1234@cluster1.bvxkm.mongodb.net/E_auction?retryWrites=true&w=majority").then(() => {
    console.log("database is connected")
}).catch(err => {
    console.log(err)
    console.log("not connected")
})

app.use(express.static(path.join(__dirname,'public')))

app.use(bodyparser.urlencoded({ extended: true }));

app.use(bodyparser.json());

app.use("/",adminRouter);

app.listen(3000, () => {
    console.log("application is runnning.....")
})