const { request } = require("express");
const { response } = require("express");
const express = require("express");
const res = require("express/lib/response");
const admincontroller = require("../controller/admin.controller");
const router = express.Router();
const { body } = require('express-validator');
const firebase = require('../middleware/firebase.middleware');
const token = require('../middleware/token.middleware');


const multer = require('multer');
var storage = multer.diskStorage(
    {
        destination: 'public/images',
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
        }
    }
);
var upload = multer({ storage: storage });

router.post("/add",token.verifyToken, upload.single('categoryImage'),
    body('categoryName').not().isEmpty(),
    firebase.fireBaseStorage,
    admincontroller.add
);
router.get("/category-list",token.verifyToken,admincontroller.getCategory);

router.post("/delete-category",token.verifyToken, admincontroller.deleteCategory);

router.post("/update",token.verifyToken, upload.single('categoryImage'),
    body('categoryName').not().isEmpty(),
    body('oldImage').notEmpty(),
    firebase.fireBaseStorage,
    admincontroller.update
);

router.post('/signin',
    body("email").isEmail(),
    body("password"),
    admincontroller.signin
);

router.get("/customer-list",token.verifyToken,admincontroller.getCustomer)

router.post('/update-profile',token.verifyToken, admincontroller.updateProfile);

router.post("/AddToBlock",token.verifyToken, admincontroller.AddToBlock);

router.post("/RemoveFromBlock",token.verifyToken, admincontroller.RemoveFromBlock);

router.post("/forget-password",admincontroller.forgetPassword);

router.post("/reset-Password",admincontroller.resetPassword);

module.exports = router