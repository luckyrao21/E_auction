const express=require("express");
const bidController=require('../controller/bid.controller')
const router=express.Router();
const token = require('../middleware/token.middleware');

router.post("/add-bid",token.verifyToken,bidController.addBid);

router.get("/view-bidlist",token.verifyToken,bidController.viewBidList)

router.post("/view-OneProduct-bidlist",token.verifyToken,bidController.viewOneProductBid)

// router.get('/view-high-valuePrice',bidController.highPrice)

module.exports=router;