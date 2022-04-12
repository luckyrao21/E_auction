const express=require("express");
const complaintController=require('../controller/complaint.controller')
const router=express.Router();

router.post('/add-complaint',complaintController.addComplaint);
router.post('/revert-complaint',complaintController.revertComplaint);



module.exports=router;
