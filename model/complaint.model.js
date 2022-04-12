const mongoose=require("mongoose");
const schema=mongoose.Schema;

const complaintSchema=new mongoose.Schema({
      userId:{
          type:schema.Types.ObjectId,
          required:true,
          ref:'customer'
      },
      complaintText:{
          type:String,
          required:true
      },
      date:{
          type:Date,
          default:new Date().now
      }
})
module.exports=mongoose.model("complaint",complaintSchema);

