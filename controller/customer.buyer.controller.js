const Alert = require("../model/alert.model");
const customerBuyer = require("../model/category.model");

exports.addAlert = async (request, response) => {
    console.log(request.body)

    let AlertModel = await Alert.findOne({
        productId: request.body.productId
    })

    if (!AlertModel) {
        AlertModel = new Alert();
        AlertModel.productId = request.body.productId;

    }

    AlertModel.buyers.push({
        buyersId: request.body.buyersId
    });

    AlertModel.save().then(result => {

        console.log(result)
        return response.status(200).json(result)

    }).catch(err => {

        console.log(err);

        return response.status(500).json({
            err: "oops something went wrong"
        })

    })

}
// exports.alert=async(req,res)=>{

//        const productId =req.body.productId;
//        const userId=req.body.userId;

//    try{
//        let alert = await Alert.findOne({productId:productId});
//        if(alert){
//            let alertIndex = alert.userId.findIndex(u=>u.userId==userId);
//            if(alertIndex>-1){
//                let users = alert.userId[alertIndex];
//                alert.userId[alertIndex]=users;
//            }else{
//                alert.userId.push({userId});
//            }
//            alert = await alert.save();
//            return res.status(201).send(alert);
//        }else{
//            const newAlert = await Alert.create({
//                productId,
//                userId:[{userId}]
//            })
//            return res.status(201).send(newAlert);
//        }
//    }
//    catch(err){
//       console.log(err);
//       res.status(500).send("Maf kijiye humse na hopaya agli bar fir koshish karenge");
//    }
// }