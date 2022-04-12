const categorymodel = require("../model/category.model");
const Admin = require('../model/admin.model');
const Customer = require('../model/customer.model');
const { validationResult } = require('express-validator');
const nodemailer=require('nodemailer');


exports.deleteCategory = (request, response) => {
    categorymodel.deleteOne({ _id: request.body.id })
        .then(result => {
            if (result.deletedCount) {
                return response.status(200).json({ message: 'success' });
            } else {

                return response.status(204).json({ message: 'not deleted' });
            }
        })
        .catch(err => {
            return response.status(500).json({ message: 'Something went wrong' });
        });
}
exports.getCategory = (request, response) => {
    categorymodel.find().
        then(results => {
            return response.status(200).json(results);
        })
        .catch(err => {
            return response.status(500).json({ message: 'Sever Error' });
        });
}
exports.getCustomer =(request,response) => {
     Customer.find().
          then(results =>{
              return response.status (200).json(results);
          })
          .catch(err=>{
              return response.send(500).json({message: 'server error'});
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
                categoryImageUrl: "http://localhost:3000/images/" + request.file.filename
            }
        }).then(result => {
            if (result.modifiedCount) {
                return response.status(200).json({ message: 'success' });
            }
            else
                return response.status(404).json({ message: 'record not found' })
        }).catch(err => {
            return response.status(500).json({ message: 'Something went wrong..' });
      
  });
}

exports.add = (request, response, next) => {
    console.log(request.body);
    console.log(request.file);
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });

    categorymodel.create({
        categoryName: request.body.categoryName,
        categoryImage: "http://localhost:3000/images/" + request.file.filename
    })
        .then(result => {
            console.log(result + "========")
            return response.status(201).json(result);
        })
        .catch(err => {
            //console.log(result+"========")
            return response.status(403).json(err);
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
                console.log(result);
                return response.status(200).json(result);
            }
            else
                return response.status(404).json({ message: 'Invalid User' });
        }).catch(err => {
            console.log("errr");
            return response.status(500).json({ message: 'Oops! something went wrong' });
        })
}
exports.AddToBlock = (request, response) => {
        console.log(request.body)
    Customer.updateOne({ _id: request.body.id }, {
        $set: {
            isBlocked: true
        }
    }).then(result => {
        // console.log(result)
        return response.status(200).json(result);
    }).catch(err => {
        return response.status(500).json(err);

    })
}

exports.RemoveFromBlock = (request, response) => {
    console.log(request.body);
    Customer.updateOne({ _id: request.body.id }, {
        $set: {
            isBlocked: false
        }
    }).then(result => {
        // console.log(result)
        return response.status(200).json(result);
    }).catch(err => {
 
       return response.status(500).json(err);
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
            return response.status(200).json(result);
        }).catch(err => {
            return response.status(500).json(err);
        })
}


exports.forgetPassword =(request,response) =>{
    console.log(request.body);
    Admin.findOne({
        email: request.body.email,
    }).then(result=>{
        console.log(result);
        if(result){
        let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                  user: "vaishali24raghuvanshi@gmail.com",
                  pass: "9669660535",
                },
              });
            
              var message = {
                from: "vaishali24raghuvanshi@gmail.com",
                to: "rajkasotiya26@gmail.com",
                subject: "Confirm your account on E_auction application",
                html:
                  '<p>Thanks for signing up with Book-Us-Meal! You must follow this link within 30 days of registration to activate your account:</p><a href= "https://book-us-meal.herokuapp.com/customer/verify-account/'+result._id+'">click here</a><p>Have fun, and dont hesitate to contact us with your feedback</p><br><p> The Book-Us-Meal Team</p><a href="#">book-us-meal@gmail.com</a>',
              };
            
              transporter.sendMail(message, (err, info) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("SUCCESS===================================\n" + info);
                  //   console.log();
                }
              });
              return response.status(200).json({success:"check your email",result:result});
        }
        else{
            return response.status(200).json({message:"no email found with this email"})
        }
    }).catch(err=>{
        return response.status(500).json({err:"oops something is wrong"})
    })
}