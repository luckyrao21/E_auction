const express=require("express");
const complaintController=require('../controller/complaint.controller')
const router=express.Router();
const token = require('../middleware/token.middleware');

router.post('/add-complaint',token.verifyToken,complaintController.addComplaint);

router.post('/revert-complaint',token.verifyToken,complaintController.revertComplaint);

router.get('/all-complaint-list',token.verifyToken,complaintController.complainList);

module.exports=router;
