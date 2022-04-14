const { request } = require("express");
const Complaint = require("../model/complaint.model");
const nodemailer = require("nodemailer");
const res = require("express/lib/response");

exports.addComplaint = (request, response) => {
  Complaint.create(request.body).then(result => {
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
        to: "luckybhoge2123@gmail.com",
        subject: "Confirm your account on Book-Us-Meal",
        html:
          '<h1>TEKO COMPLAINT AAYI HAI RE!!!!!</h1>'
      };

      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("SUCCESS===================================\n" + info);
        }
      });
      return response.status(201).json({ data: result, success: "Complaint Send" })
    }
    else {
      return response.status(201).json({ message: "nhi hogi complaint" })
    }
  }).catch(err => {
    console.log(err);
    return response.status(500).json({ error: "Internal Server Error" })
  })
}

exports.revertComplaint = (request, response) => {
  Customer.findOne({ _id:  request.body.userId})
    .then(customer => {
      if(customer){
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
          subject: "Your Complaint Response",
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
        return response.status(201).json({ success: "Response Send " });
      }
      else
      return response.status(201).json({ success: "Response Not Send " });
    })
    .catch(err => {
      return response.status(201).json({ failed: "Internal Server Error......." });
    });
}

exports.complainList = (request,response,next)=>{
      Complaint.find().populate('userId')
      .then(result=>{
        if(result)
         return response.status(200).json(result);
        else
         return response.status(200).json({message: "Result Not Found"});
      })
      .catch(err=>{
        return response.status(200).json({error: "Internal Server Error..."});
      });
}