const mongoose=require("mongoose");
const schema=mongoose.Schema;

const bidSchema=new mongoose.Schema({
        creator:[
            {
            buyersId:{
                type:schema.Types.ObjectId,
                ref:'customer'
            },
            priceValue:{
                type:Number,
                required:true,
            },
            isApproved:{
                type:Boolean,
                default:false
            }
        }
    ],
        productId:{
            type:schema.Types.ObjectId,
            ref:'product'
        },
        date:{
            type:Date,
           default:new Date().now
        }
})

module.exports=mongoose.model("bid",bidSchema);