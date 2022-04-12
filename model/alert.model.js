const mongoose = require("mongoose");
const schema = mongoose.Schema;

const alertSchema = new mongoose.Schema({
    productId: {
        type: schema.Types.ObjectId,
        required: true,
        ref: 'product'
    },
    buyers: [{
        buyersId: {
            type: schema.Types.ObjectId,   
            ref: 'customer'
        }
    }]
})
// <<<<<<< jayshree
// module.exports = mongoose.model("alert", alertSchema);
// =======
// module.exports=mongoose.model("alert",alertSchema);

// >>>>>>> master
