const mongoose=require("mongoose");
const schema=mongoose.Schema;

const alertSchema=new mongoose.Schema({
        productId:{
            type:schema.Types.ObjectId,
            required:true,
            ref:'product'
        },
        userId:[
            {
                type:schema.Types.ObjectId,
                ref:'customer'
            }
        ]
})
module.exports=mongoose.model("alert",alertSchema);

