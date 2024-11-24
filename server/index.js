const express = require("express");
const connectedDb = require("./config/db");
const payRouter = require("./routes/PaymentRoute"); 
const app = express();

const port = 4000;

connectedDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api", payRouter);

app.get("/test", (req, res) => {
  res.json({ Success: true, Msg: "API is Running.." });
});


app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
