require("dotenv").config();
const express = require("express");
const connectedDb = require("./config/db");
const payRouter = require("./routes/PaymentRoute");
const cors = require("cors");
const Razorpay = require("razorpay");
const app = express();

const port = process.env.PORT;
app.use(cors({
  origin: "https://payment-soumadip.vercel.app",
  credentials: true
}));

connectedDb();

// Initialize Razorpay instance here, but don’t export it
const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api", payRouter);

app.get("/test", (req, res) => {
  res.json({ Success: true, Msg: "API is Running.." });
});

// Export the Razorpay instance only if needed
module.exports = { instance };

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
