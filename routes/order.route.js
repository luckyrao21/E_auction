
const express=require("express");
const orderController=require("../controller/order.controller")
const router=express.Router();


router.post("/place-order",orderController.placeOrder);
router.post("/view-order",orderController.viewOrder);



module.exports=router