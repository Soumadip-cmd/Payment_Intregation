const express = require("express");
const { PaymentCheck, PaymentVerify } = require("../controller/Payment.controller");

const payRouter = express.Router();

payRouter.post("/checkout", PaymentCheck);
payRouter.post("/verify", PaymentVerify);

module.exports = payRouter;
