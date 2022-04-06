const { request } = require("express");
const { response } = require("express");
const express=require("express");
const res = require("express/lib/response");
const adminModel = require("../model/admin.model");
const router=express.Router();
const amdinModel=require("../model/admin.model");

router.post("/login",(request,response)=>{
    console.log(request.body);

    adminModel.create({
        email:request.body.email,
        password:request.body.password
    }).then(result=>{
        console.log(result);
        return response.status(200).json(result)
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({message:"oops someting went wrong"})
    })
})

module.exports=router