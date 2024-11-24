const PaymentCheck = (req, res) => {
  console.log("PaymentCheck executed");
  res.status(200).json({ message: "Payment check successful" });
};

const PaymentVerify = (req, res) => {
  console.log("PaymentVerify executed");
  res.status(200).json({ message: "Payment verify successful" });
};

module.exports = { PaymentCheck, PaymentVerify };
