
const categorymodel = require("../model/category.model");
const Admin = require('../model/admin.model');
const Customer = require('../model/customer.model');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

exports.deleteCategory = (request, response) => {
    categorymodel.deleteOne({ _id: request.body.id })
        .then(result => {
            if (result.deletedCount) {
                return response.status(200).json({ success: 'success' });
            } else {

                return response.status(204).json({ message: 'not deleted' });
            }
        })
        .catch(err => {
            return response.status(500).json({ error: 'Something went wrong' });
        });
}
exports.getCategory = (request, response) => {
    categorymodel.find().
        then(results => {
            return response.status(200).json(results);
        })
        .catch(err => {
            return response.status(500).json({ error: 'Sever Error' });
        });
}
exports.getCustomer = (request, response) => {
    Customer.find().
        then(results => {
            return response.status(200).json(results);
        })
        .catch(err => {
            return response.send(500).json({ error: 'server error' });
        });
}
exports.update = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });
    
        categorymodel.updateOne({ _id: request.body.categoryId },
        {
            $set: {
                categoryName: request.body.categoryName,
                categoryImageUrl: "https://firebasestorage.googleapis.com/v0/b/productdb-eaa0c.appspot.com/o/" + request.file.filename + "?alt=media&token=abcddcba"
            }
        }).then(result => {
            if (result.modifiedCount) {
                return response.status(200).json({ success: 'success' });
            }
            else
                return response.status(404).json({ message: 'record not found' })
        }).catch(err => {
            return response.status(500).json({ error: 'Something went wrong..' });

        });
}

exports.add = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });

    categorymodel.create({
        categoryName: request.body.categoryName,
        categoryImage: "https://firebasestorage.googleapis.com/v0/b/productdb-eaa0c.appspot.com/o/" + request.file.filename + "?alt=media&token=abcddcba"
    })
        .then(result => {
            return response.status(201).json({ data: result, message: "Category Added..." });
        })
        .catch(err => {
            return response.status(403).json({ error: "Inaternal Server Error......" });
        });
}
exports.signin = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(403).json({ errors: errors.array() });
    }

    Admin.findOne({
        email: request.body.email,
        password: request.body.password
    })
        .then(result => {
            if (result) {
                let payload = { subject: result._id };
                let token = jwt.sign(payload, "giugifsyjhsadgjbjfbbdsfjbjbk");
                return response.status(200).json({ data: result, token: token });
            }
            else
                return response.status(404).json({ message: 'Invalid User' });
        }).catch(err => {
            return response.status(500).json({ error: 'Oops! something went wrong' });
        })
}

exports.AddToBlock = (request, response) => {
    Customer.updateOne({ _id: request.body.id }, {
        $set: {
            isBlocked: true
        }
    }).then(result => {
        if (result.modifiedCount == 1)
            return response.status(200).json({ successs: "Customer Blocked.." });
        else
            return response.status(200).json({ message: "Not Blocked..." });
    }).catch(err => {
        return response.status(500).json({ error: 'Oops! something went wrong' });
    })
}

exports.RemoveFromBlock = (request, response) => {
    Customer.updateOne({ _id: request.body.id }, {
        $set: {
            isBlocked: false
        }
    }).then(result => {
        if (result.modifiedCount == 1)
            return response.status(200).json({ successs: "Customer Unblocked.." });
        else
            return response.status(200).json({ message: "Not Unblocked..." });
    }).catch(err => {
        return response.status(500).json({ error: 'Oops! something went wrong' });
    })
}

exports.updateProfile = (request, response) => {
    Admin.updateOne({ _id: request.body.id },
        {
            $set: {
                email: request.body.email,
                password: request.body.password,
            }
        }).then(result => {
            if (result.modifiedCount == 1)
                return response.status(200).json({ successs: "Updated Successfully.." });
            else
                return response.status(200).json({ message: "Not Updated..." });
        }).catch(err => {
            return response.status(500).json({ error: 'Oops! something went wrong' });
        })
}

exports.forgetPassword = (request, response) => {
    Admin.findOne({
        email: request.body.email,
    }).then(result => {
        if (result) {
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
                to: result.email,
                subject: "Your Product Is Approved For Auction",
                html: `
                           <h1>Your Product Is Approved For Auction Now People Can Bid On Your Product</h1>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                `
              };
  
              transporter.sendMail(message, (err, info) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(info);
                }
              });
  
            return response.status(200).json({ success: "check your email", result: result });
        }
        else {
            return response.status(200).json({ message: "No User Found With This Email Address" })
        }
    }).catch(err => {
        return response.status(500).json({ error: "oops something is wrong" })
    })
}

exports.resetPassword=(request,response)=>{
    customerSeller.updateOne( 
        { email: request.body.email },
        {
          $set:{
              password:request.body.newPassword
          }
        }
     )
     .then(result=>{
        if(result.modifiedCount == 1) 
          return response.status(201).json({message: "password reset Successfully"});
        else
          return response.status(201).json({error: "Not Updated.."});           
     })
    .catch(err=>{
        return response.status(201).json({error: "Internal Server Error......."});
    }); 
}