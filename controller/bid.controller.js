const { response } = require("express");
const BID = require('../model/bid.model')
const { request } = require("express");
const bidModel = require("../model/bid.model");

exports.addBid = async (request,response) => {
    console.log(request.body);
  
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
        console.log(result)
        return response.status(200).json(result)
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({err:"oops something went wrong"})
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
    }).populate('creator.buyersId').populate('productId').then(result=>{
        return response.status(200).json(result)
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({err:"oops something went wrong"})
    })
}

