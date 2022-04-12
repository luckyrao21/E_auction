const express=require("express");
const bidController=require('../controller/bid.controller')
const router=express.Router();

router.post("/add-bid",bidController.addBid);
router.get("/view-bidlist",bidController.viewBidList)
router.post("/view-OneProduct-bidlist",bidController.viewOneProductBid)
// router.get('/view-high-valuePrice',bidController.highPrice)

module.exports=router;