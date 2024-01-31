const { Router } = require("express");
const {createOrder , receiveWebhooks} = require("../controllers/paymentController")

const paymentRoute = Router();


paymentRoute.post("/createOrder/:idKey", createOrder);
paymentRoute.get("/success", (req,res) => res.send("success"));
paymentRoute.get("/pending", (req,res) => res.send("pending"));
paymentRoute.get("/failure", (req,res) => res.send("failure"));
paymentRoute.post("/webhook/:idKey", receiveWebhooks);



module.exports = paymentRoute;
