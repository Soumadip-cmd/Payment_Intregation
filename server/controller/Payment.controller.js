const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/PaymentModel");

// Payment checking
const PaymentCheck = async (req, res) => {
  try {
    const { number } = req.body;
    
    if (!number) {
      return res.status(400).json({ 
        success: false,
        error: "Amount is required" 
      });
    }

    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    const options = {
      amount: Math.round(number * 100), 
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create order: " + error.message
    });
  }
};

// Payment verify
const PaymentVerify = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: "Missing payment verification parameters"
      });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const generated_signature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      const payment = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      await payment.save();

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        paymentId: razorpay_payment_id
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "Payment verification failed"
      });
    }
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error: " + error.message
    });
  }
};

module.exports = { PaymentCheck, PaymentVerify };