const { Router } = require("express");
const {createOrder} = require("../controllers/paymentController")

const paymentRoute = Router();


paymentRoute.post("/createOrder", createOrder);
paymentRoute.get("/success", (req,res) => res.send("success"));
paymentRoute.get("/pending", (req,res) => res.send("pending"));
paymentRoute.get("/failure", (req,res) => res.send("failure"));
paymentRoute.post("/webhooks",);



module.exports = paymentRoute;
