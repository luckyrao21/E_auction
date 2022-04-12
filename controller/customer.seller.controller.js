
// const { response } = require("express");
// const { request } = require("express");
const { response } = require("express");
const { request } = require("express");
const nodemailer=require("nodemailer")
const customerSeller=require('../model/customer.model')

exports.signup=(request,response)=>{
    console.log(request.body);
    customerSeller.create(request.body).then(result=>{
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
            to: "vaishali24raghuvanshi@gmail.com",
            subject: "Confirm your account on Book-Us-Meal",
            html:
              '<p>you are a nice person for signing up with Book-Us-Meal! You must follow this link within 30 days of registration to activate your account:</p><a href= "https://book-us-meal.herokuapp.com/customer/verify-account/'+result._id+'">click here</a><p>Have fun, and dont hesitate to contact us with your feedback</p><br><p> The Book-Us-Meal Team</p><a href="#">book-us-meal@gmail.com</a>',
          };
        
          transporter.sendMail(message, (err, info) => {
            if (err) {
              console.log(err);
            } else {
              console.log("SUCCESS===================================\n" + info);
              //   console.log();
            }
          });
        console.log(result)
        return response.status(201).json(result)
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({status:"registration failed"})
    })
}

exports.signin=(request,response)=>{
    console.log(request.body);
    customerSeller.findOne({
        email:request.body.email,
        password:request.body.password
    }).then(result=>{
        console.log(result)
        if(result){
        return response.status(201).json({status:"login success",data:result})
        }
        else{
            return response.status(500).json({error:"login failed"})
        }
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({message:"oops something went wrong"})
    })
}
exports.updateProfile=(request,response)=>{
    console.log(request.body);
    customerSeller.updateOne({
        _id:request.body.customerId
    },{
        $set:request.body
    }).then(result=>{
        console.log(result)
        return response.status(200).json(result)
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({message:"oops something went wrong"})
    })
}

exports.forgotPassword=(request,response)=>{
    console.log(request.body);

    customerSeller.findOne({
        email:request.body.email
    }).then(result=>{
        console.log(result);
        if(result){
                let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                  user: "vastram823@gmail.com",
                  pass: "fcv@1234",
                },
              });
            
              var message = {
                from: "vastram823@gmail.com",
                to: "rajkasotiya26@gmail.com",
                subject: "Your Product Is Approved For Auction",
                html:`
                <input type="text" placeholder="enter new password">
                <button>reset Password</button>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                 `     
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
        console.log(err);
        return response.status(500).json({err:"oops something went wrong"})
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
        console.log(err+"=======================errrrr");
        return response.status(201).json({error: "Internal Server Error......."});
    }); 
}


