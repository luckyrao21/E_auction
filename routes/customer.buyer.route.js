const express = require ('express')
const router = express.Router();
const customerController=require("../controller/customer.buyer.controller")

router.post("/alert",customerController.addAlert);


module.exports=router;