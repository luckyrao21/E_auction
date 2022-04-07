
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
              user: "vastram823@gmail.com",
              pass: "fcv@1234",
            },
          });
        
          var message = {
            from: "vastram823@gmail.com",
            to: "rajkasotiya26@gmail.com",
            subject: "Confirm your account on Book-Us-Meal",
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