const { request } = require("express");
const Complaint=require("../model/complaint.model");
const nodemailer=require("nodemailer")

exports.addComplaint=(request,response)=>{
    console.log(request.body);
    Complaint.create(request.body).then(result=>{
        if(result){
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
                to: "rajkasotiya26@gmail.com",
                subject: "Confirm your account on Book-Us-Meal",
                html:
                  '<h1>TEKO COMPLAINT AAYI HAI RE!!!!!</h1>'
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
        }
        else{
            return response.status(201).json({message:"nhi hogi complaint"})
        }
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({status:"registration failed"})
    })
}

exports.revertComplaint=(request,response)=>{
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
                to: "rajkasotiya26@gmail.com",
                subject: "Confirm your account on Book-Us-Meal",
                html:
                  '<h1>TEKO COMPLAINT AAYI HAI RE!!!!!</h1>'
              };
            
              transporter.sendMail(message, (err, info) => {
                if (err) {
                    return response.status(201).json({message:"response not sent"})
                } else {
                    return response.status(201).json({message:"response sent"})
                  //   console.log();
                }
              });
          

     
    
    }
