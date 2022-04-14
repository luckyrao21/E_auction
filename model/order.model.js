const mongoose=require("mongoose");
const schema=mongoose.Schema;

const orderSchema=new mongoose.Schema({
    userId:{
          type:schema.Types.ObjectId,
          ref:'customer'
      },
     productId:{
         type:schema.Types.ObjectId,
         required:true,
         ref:'product'
     },
     mobile:{
         type:Number,
        //  length:10,
         required:true,
     },
     address:{
            type:String,
            required:true
     },
     total:{
        type:Number,
        required:true,
     },
     pincode:{
        type:Number,
        required:true

     },
     orderStatus:{
        type:String,
        required:true,
        default:"not shipped"
     },
      date:{
          type:Date,
          default:new Date().now,
      },
})
module.exports=mongoose.model("order",orderSchema);

