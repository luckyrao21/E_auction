const express = require("express");
const mongoose = require("mongoose");
const adminRouter = require("./routes/admin.route")

const bidRoute=require("./routes/bid.route")
const complaintRoute=require("./routes/complaint.route")
const orderRoute=require("./routes/order.route")
const customerRouter=require("./routes/customer.seller.route")
const path=require("path")

// const sellerRouter = require('./routes/seller.route');
const productRouter = require('./routes/product.route');

// const multer=require("multer");
const cors = require("cors");
const { application } = require("express");


const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://lucky:1234@cluster1.bvxkm.mongodb.net/E_auction?retryWrites=true&w=majority").then(() => {
   console.log("database is connected")
}).catch(err => {
    console.log(err)
    console.log("not connected")
})

app.use(express.static(path.join(__dirname,'public')))

app.use("/",adminRouter);
app.use("/customer",customerRouter)
app.use("/bid",bidRoute);
app.use("/complaint",complaintRoute)
app.use("/order",orderRoute)



app.use("/product",productRouter);


app.listen(3000, () => {
    console.log("application is runnning.....",3000)
})
