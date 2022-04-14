const { response } = require("express");
const { request } = require("express");
const nodemailer = require("nodemailer")
const customerSeller = require('../model/customer.model')
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');

exports.signup = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response.status(400).json({ errors: errors.array() });
  customerSeller.create(request.body).then(result => {
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
      subject: "Confirm your account on Book-Us-Meal",
      html:
        '<p>you are a nice person for signing up with Book-Us-Meal! You must follow this link within 30 days of registration to activate your account:</p><a href= "https://book-us-meal.herokuapp.com/customer/verify-account/' + result._id + '">click here</a><p>Have fun, and dont hesitate to contact us with your feedback</p><br><p> The Book-Us-Meal Team</p><a href="#">book-us-meal@gmail.com</a>',
    };

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("SUCCESS===================================\n" + info);
      }
    });
    console.log(result)
    return response.status(201).json(result)
  }).catch(err => {
    console.log(err);
    return response.status(500).json({ status: "registration failed" })
  })
}

exports.signin = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response.status(400).json({ errors: errors.array() });
  customerSeller.findOne({
    email: request.body.email,
    password: request.body.password,
    isVerified: true,
    isBlocked: false
  }).then(result => {
    if (result) {
      let payload = { subject: result._id };
      let token = jwt.sign(payload, "giugifsyjhsadgjbjfbbdsfjbjbk");
      return response.status(201).json({ status: "login success", data: result, token: token })
    }
    else {
      return response.status(500).json({ failed: "login failed" })
    }
  }).catch(err => {
    console.log(err);
    return response.status(500).json({ error: "oops something went wrong" })
  })
}
exports.updateProfile = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response.status(400).json({ errors: errors.array() });
  customerSeller.updateOne({
    _id: request.body.customerId
  }, {
    $set: request.body
  }).then(result => {
    if (result.modifiedCount == 1)
      return response.status(201).json({ success: "Updated Successfully" });
    else
      return response.status(201).json({ error: "Not Updated.." });

  }).catch(err => {
    return response.status(500).json({ message: "oops something went wrong" })
  })
}

exports.forgotPassword = (request, response) => {
  customerSeller.findOne({
    email: request.body.email
  }).then(result => {
    console.log(result);
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
        subject: "Reset Password",
        html: `
                <input type="text" placeholder="enter new password">
                <button>reset Password</button>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                 `
      };

      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("SUCCESS===================================\n" + info);
        }
      });
      return response.status(200).json({ success: "check your email", result: result });
    }
    else {
      return response.status(200).json({ message: "No User Found With This Email Address" })
    }
  }).catch(err => {
    console.log(err);
    return response.status(500).json({ error: "oops something went wrong" })
  })
}

exports.resetPassword = (request, response) => {
  customerSeller.updateOne(
    { email: request.body.email },
    {
      $set: {
        password: request.body.newPassword
      }
    }
  )
    .then(result => {
      if (result.modifiedCount == 1)
        return response.status(201).json({ message: "password reset Successfully" });
      else
        return response.status(201).json({ error: "Not Updated.." });
    })
    .catch(err => {
      console.log(err + "=======================errrrr");
      return response.status(201).json({ error: "Internal Server Error......." });
    });
}


