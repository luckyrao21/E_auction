
const categorymodel = require("../model/category.model");
const Admin = require('../model/admin.model');
const Customer = require('../model/customer.model');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const requests = require('request');

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
                requests({
                    url: request.body.oldImage,
                    qs: {
                       key: "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDnyJ+6t98bJQwl\nBe24m7gBCH8Slb3GG9FB6avOOY5YAIGY0zsdt7vs1njzYvZitTBaE3epoxcaua1J\nya8BzHFp/u2YSOQQM/v+X7qVbbXCBS/E7M43bP2/NNwOLuoY2MmIa8EVJejqeSTT\nlssAJcNho9H8g3UbA3/28UjpC2gv2ctqAPD7gTNFbTQ3Bq2wvrNuetgAD+C88lTC\nYywncEDC9IWsWov6yL9MIp5cMpS8ISIU+25ZrIM7QmCTDHyutJOruo1Z3ZbSNGwc\nArATZ0avYVuwRRwICrUcLyMr1lfxAnDM6Lgn2uRBB1k+ISAhA+0nx/ST7FNwJprg\nhB6sDoSlAgMBAAECggEAII8IEPx/NJrxp8m7aPFG2a5N21h5ffiuXmnqnl9rZWU8\nzzDs3vHOTiiaeOXv4lG9ZwnRB11Hg5ONig3wrXoAfHk4+ulSUAxdW5Aq746nt4du\n/GSfWx3OTyuntb5VWAQr2yP3zXazzywRRj+qaGzlkzOl7aixrIfDU/b03PejPQVA\nnwOYQRPRXDjTKllM8zr2dQ2mgIe9L7b4BWiZVNFx/fH2OunCcz9hi/0Ojnv3PjXy\n70nFEhU+N9wJyOGzA1zeVRjgYuPkePRaJvHKJRw3E0I8/58LNmFY26sYJvcEzQeI\n0dOdnQbpgic3hYsyeLhmoXNR7sCw9q5Dndf5RsBbSQKBgQD5lCmO2gC4LkXAIYKK\nzOi1yUouCZYBljPObs9RdkWIzCW0nhEd1zjF+goXqpb2cnFxO2NZm7ajMZi+doHN\nc76kskqAWHyMZlmmAF07cKmvwfLttdxa+SGMPKWYYFzdfAb5HPjynGXBW5mJqU5y\nCEOhrjaCRZqjqDrXN00w2oGMhwKBgQDtv0FaGn4FhG8ozZeClxagCxNPozZcotGp\n9zzn8eHW2Q39zWIkMocb4C16allxZqEIMCselxOCkoa3YwV8wdUg6xxc/M+RNfCZ\nooQ4/Y0kmIZklT4hETson1ubwYrWRwjDkKsaAeeicw/+8edso5mMcDneXZia1Mop\n/cMbA518cwKBgQC6BBINZLKQk/xsvQ0dAqiXhRWCxqZFPHwUakafArXExdN8kStU\nwGqSNFB9XynxOU8QBCGCUiqH65laq90HEjOPcUtR6aG6yzYaIb9bZBc05it3vMom\nC/VTHoiVz4ynj59q4Isz2BmHSgxfrA7JsxslUEFUSyh8vhBNA+zGcrWH1QKBgGpK\ne3lBJt5omxnu8LHdwqvCx9tu6Lr5wCrw8jXwmjtnxy2VSS9Nt8Hqs+pq6ZodfBkh\nD+YZPQu/XqNWjfl830BcXM3l6RbOusa1NdAU66lU16DYaHJ4Na6vsFEuclfiYjSs\n1RJHj7u9HYWpuQGFEv0Kn5Se2789KzUi0rudHiepAoGAQ/Zw3PTK9xwVmm3sd5ZI\nSuvg1CHRHHAVLxQFpy+GVQy+kO/LgVWFponf4UKEL39VV1syuvzp4v9ytX57eqks\nJjzg/8+3fgsT6qo16LZgA5/ql1IRpG8zmhbItKLygx+9akqAc/oPpqVy9up4kQLC\nu62tjbyu3phwCOqp7wIBVlI=",
                    }, // you can find your private-key in your keyfile.json
                    method: "DELETE",
                 });

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