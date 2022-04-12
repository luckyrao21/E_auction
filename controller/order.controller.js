const orderModel = require("../model/order.model");

exports.placeOrder=(request,response)=>{
    orderModel.create(request.body)
     .then(result=>{
      return response.status(200).json(result)           
     })
    .catch(err=>{
        console.log(err)
        return response.status(201).json({error: "Internal Server Error......."});
    }); 
}

exports.viewOrder=(request,response)=>{
    orderModel.findOne({
        userId:request.body.userId
    }).populate('userId').populate('productId')
     .then(result=>{
      return response.status(200).json(result)           
     })
    .catch(err=>{
        console.log(err)
        return response.status(201).json({error: "Internal Server Error......."});
    }); 
}