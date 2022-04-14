const express = require("express");
const router = express.Router();
const customerController = require("../controller/customer.seller.controller");
const token = require('../middleware/token.middleware');
const { body } = require('express-validator');

router.post("/signup",
    body('username').notEmpty(),
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isLength(6),
    body('mobile').notEmpty().isNumeric().isLength(10),
    body('address').notEmpty(),
    customerController.signup
);

router.post("/signin",
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isLength(6),
    customerController.signin
);

router.post("/updateProfile",
    body('username').notEmpty(),
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isLength(6),
    body('mobile').notEmpty().isNumeric().isLength(10),
    body('address').notEmpty(),
    token.verifyToken, customerController.updateProfile
);

router.post("/forgot-password", customerController.forgotPassword);

router.post("/reset-Password", customerController.resetPassword);

module.exports = router;