const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/PaymentModel");

// Payment checking
const PaymentCheck = async (req, res) => {
  try {
    const { number } = req.body;
    
    console.log("Received payment request for amount:", number);
    
    if (!number) {
      console.log("Amount is missing in request");
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

    console.log("Creating Razorpay order with options:", options);

    const order = await instance.orders.create(options);
    console.log("Razorpay order created:", order);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create order",
      details: error.message,
      code: error.code
    });
  }
};


// Payment verify
const PaymentVerify = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: "Missing required payment verification parameters"
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Database comes here
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      res.status(200).json({
        success: true,
        message: "Payment verified successfully"
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Payment verification failed"
      });
    }
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error during verification"
    });
  }
};





module.exports = { PaymentCheck, PaymentVerify };