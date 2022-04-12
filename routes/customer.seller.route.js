const express = require("express");
const router=express.Router();
const customerController=require("../controller/customer.seller.controller");

router.post("/signup",customerController.signup);
router.post("/signin",customerController.signin);
router.post("/updateProfile",customerController.updateProfile);
router.post("/forgot-password",customerController.forgotPassword);
router.post("/reset-Password",customerController.resetPassword);




module.exports=router;