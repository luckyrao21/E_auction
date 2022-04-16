const express = require('express');
const productController = require('../controller/product.controller');
const { body } = require('express-validator');
const route = express.Router();
const firebase = require("../middleware/firebase.middleware");
const token = require('../middleware/token.middleware');
const requests = require('request');


const multer = require("multer");
var storage = multer.diskStorage({
    destination: "public/images",
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

var upload = multer({ storage: storage });


route.post("/add-product",token.verifyToken, upload.single('productImage'),
    body('productName').notEmpty(),
    body('productDesc').notEmpty(),
    body('productInitialPrice').isNumeric().notEmpty(),
    body('creator').notEmpty(),
    body('startTime').notEmpty(),
    body('endTime').notEmpty(),
    body('categoryName').notEmpty(),
    firebase.fireBaseStorage,
    productController.add);

route.post("/delete-product",token.verifyToken, body('productId').notEmpty(), productController.delete)

route.get("/product-list", productController.productList);

route.post("/edit-product",token.verifyToken, upload.single('productImage'),
    body('productName').notEmpty(),
    body('productDesc').notEmpty(),
    body('productInitialPrice').isNumeric().notEmpty(),
    body('startTime').notEmpty(),
    body('endTime').notEmpty(),
    body('categoryName').notEmpty(),
    body('productId').notEmpty(),
    body('oldImage').notEmpty(),
    firebase.fireBaseStorage,
    
    productController.edit);

route.post("/product-approved",token.verifyToken, productController.isApproved);

route.post("/product-search",productController.searchProduct);

route.post("/product-approved-cancel",token.verifyToken, productController.isApprovedCancel);

route.post("/product-list-category", productController.productListByCategory);

route.post("/product-list-by-seller",token.verifyToken, productController.productListBySeller);

route.post("/approved-product-list-by-seller",token.verifyToken, productController.approvedProductListBySeller);

route.post("/cancel-product-list-by-seller",token.verifyToken, productController.cancelProductListBySeller);

route.post("/cancel-product-auction",token.verifyToken, productController.cancelProductAuction);

    
module.exports = route;
