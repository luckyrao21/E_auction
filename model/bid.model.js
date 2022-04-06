const mongoose=require("mongoose");
const schema=mongoose.Schema;

const bidSchema=new mongoose.Schema({
        priceValue:{
            type:Number,
            required:true,
        },
        creator:{
            type:schema.Types.ObjectId,
            ref:'customer',
            required:true,
        },
        productId:{
            type:schema.Types.ObjectId,
            ref:'product'
        },
        isApproved:{
            type:Boolean,
            required:true,
            default:false
        },
        date:{
            type:Date,
            required:true
        }
})
module.exports=mongoose.model("bid",bidSchema);