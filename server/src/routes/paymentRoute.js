const { Router } = require("express");
const {
  createOrder,
  receiveWebhooks,
  getDataPayment,
} = require("../controllers/paymentController");

const paymentRoute = Router();

paymentRoute.post("/createOrder/:idKey", createOrder);
paymentRoute.get("/success/:idkey", getDataPayment, (req, res) =>
  res.send("success")
);
paymentRoute.get("/pending", (req, res) => res.send("pending"));
paymentRoute.get("/failure", (req, res) => res.send("failure"));
paymentRoute.get("/getDataPayment/:idkey", getDataPayment);
paymentRoute.post("/webhook/:idKey", receiveWebhooks);

module.exports = paymentRoute;
