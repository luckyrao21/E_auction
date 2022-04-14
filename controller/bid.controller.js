const { response } = require("express");
const BID = require('../model/bid.model')
const { request } = require("express");
const bidModel = require("../model/bid.model");

exports.addBid = async (request,response) => {
  
    let bidModel = await BID.findOne({
        productId:request.body.productId
    })
  
    if (!bidModel){
        bidModel = new BID();
        bidModel.productId = request.body.productId;
    }
    bidModel.creator.push({
        buyersId: request.body.buyersId,
        priceValue: request.body.priceValue,
    });
    bidModel.save().then(result=>{
       if(result) 
          return response.status(200).json({data: result, succes: "Bid Added Successfully"})
       else
          return response.status(200).json({data: result, succes: "Bid Not Added Successfully"})
    }).catch(err=>{
        return response.status(500).json({error:"oops something went wrong"})
    })
}

exports.viewBidList = async (request,response) => {
        
    bidModel.find().populate('creator.buyersId').populate('productId').then(result=>{
        return response.status(200).json(result)
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({err:"oops something went wrong"})
    })
}

exports.viewOneProductBid = async (request,response) => {
    bidModel.findOne({
        productId:request.body.productId
    }).populate('creator.buyersId').populate('productId')
    .then(result=>{
       if(result){
         result.creator.sort((a,b)=> {return b.priceValue -a.priceValue})
         return response.status(200).json(result)
       }
       else
         return response.status(200).json({messege: "Result Not Found..."})
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({err:"oops something went wrong"})
    })
}

