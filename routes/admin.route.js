const { request } = require("express");
const { response } = require("express");
const express = require("express");
const res = require("express/lib/response");
const admincontroller = require("../controller/admin.controller");
const router = express.Router();
const { body } = require('express-validator');

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

router.post("/add", upload.single('categoryImage'),
    body('categoryName').not().isEmpty(),
    admincontroller.add
);
router.get("/category-list",
    admincontroller.getCategory);

router.post("/delete-category", admincontroller.deleteCategory);

router.post("/update", upload.single('categoryImage'),
    body('categoryName').not().isEmpty(),

    admincontroller.update
);
router.post('/signin', body("email").isEmail(),
    body("password"),
    admincontroller.signin);
router.get("/customer-list",
   admincontroller.getCustomer
)
router.post('/update-profile', admincontroller.updateProfile);
router.post("/AddToBlock", admincontroller.AddToBlock);
router.post("/RemoveFromBlock", admincontroller.RemoveFromBlock);
router.post("/forget-password",admincontroller.forgetPassword);
module.exports = router