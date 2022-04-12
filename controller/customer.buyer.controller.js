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
