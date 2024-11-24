const Razorpay = require("razorpay");

// Payment checking
const PaymentCheck = (req, res) => {
      const {number}=req.body
  const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  const orderOptions = {
    amount: number,
    currency: "INR",
  };

  instance.orders.create(orderOptions, (err, order) => {
    if (err) {
      return res.status(500).json({ error: "Failed to create order" });
    }

    res.status(200).json({
      message: "Payment check successful",
      order,
    });
  });
};


// payment verify
const PaymentVerify = (req, res) => {
  console.log("PaymentVerify executed");
  res.status(200).json({ message: "Payment verify successful" });
};

module.exports = { PaymentCheck, PaymentVerify };
