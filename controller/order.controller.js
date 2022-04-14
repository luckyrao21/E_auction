const orderModel = require("../model/order.model");
const Customer = require('../model/customer.model');
const fast2sms = require('fast-two-sms');
const nodemailer = require('nodemailer');

exports.placeOrder = (request, response) => {
    orderModel.create(request.body)
        .then(result => {
            Customer.findOne({ _id: result.userId })
                .then(customer => {
                    //email sending
                    let transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 587,
                        secure: false,
                        requireTLS: true,
                        auth: {
                            user: "bidauction23@gmail.com",
                            pass: "brainforcode",
                        },
                    });

                    var message = {
                        from: "bidauction23@gmail.com",
                        to: customer.email,
                        subject: "Your Order Is Placed",
                        html: `
                         <h1>Your Product Is Approved For Auction Now People Can Bid On Your Product</h1>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
              `
                    };

                    transporter.sendMail(message, (err, info) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("SUCCESS===================================\n" + info);
                        }
                    });

                    //sms sending
                    var option = {
                        authorization: 'AqpRDdaVo8JnHEXKQGliyYvB0594L7WkjPcmxrIe2hC3g1MfTtZbRkCjvVMgJFeuO483zPcBaxYdXmKW',
                        message: "Congratulations!!! your order is succesfully placed....."
                        , numbers: [result.mobile]
                    }
                    fast2sms.sendMessage(option);

                    return response.status(201).json({ success: "Orderd Placed Successfully" });
                })
                .catch(err => {
                    return response.status(201).json({ failed: "Ordered Not Placed......." });
                });
        })
        .catch(err => {
            console.log(err);
            return response.status(201).json({ error: "Internal Server Error......." });
        });
}

exports.viewOrder = (request, response) => {
    orderModel.findOne({
        userId: request.body.userId
    }).populate('userId').populate('productId')
        .then(result => {
            return response.status(200).json(result)
        })
        .catch(err => {
            return response.status(201).json({ error: "Internal Server Error......." });
        });
}