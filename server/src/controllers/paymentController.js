const {MercadoPagoConfig, Preference, Payment} = require( "mercadopago");
const {User,CartItem,} = require ("../db");
const { Sequelize } = require("sequelize");
const axios = require('axios');
require('dotenv').config();

const createOrder = async (req,res) => {
    const {idKey} = req.params
    try{
    const client = new MercadoPagoConfig({accessToken:"TEST-2735218977605833-012419-e6d876a59733cd50c1253ffd9c89fa90-1651807239"});

    const body = {
        items: [
            {
                title: req.body.title,
                unit_price:Number(req.body.price),
                currency_id: "USD",
                quantity:Number(req.body.quantity)
            }
        ],
        back_urls : {
            success: "https://7eee-190-67-196-176.ngrok-free.app/payment/success",
            failure: "http://localhost:3000/payment/pending",
            pending: "https://7eee-190-67-196-176.ngrok-free.app /"
        },
        Notification_url :`https://7eee-190-67-196-176.ngrok-free.app/payment/webhook/${idKey}`,
    }

    const preference = new Preference(client);
    const result = await preference.create({ body })
    console.log(result)
    res.json({
        id: result.id,
    })
}catch(error){
    console.log(error)
    res.status(500).json({
        error:"error al crear referencia"
    })
}
}

const receiveWebhooks = async (req,res) => {
    const {idKey} = req.params;
    const payment = req.query;
    const idKeyString = idKey.toString();
    try{
    console.log( "este es el payment," ,payment);
    console.log( "esta es el id", idKey);
    if(payment.type === "payment" &&  payment['data.id']){
        const response = await User.findByPk(idKey);
        const mercadoPagoResponse = await axios.get(`https://api.mercadopago.com/v1/payments/${payment['data.id']}`, {
                headers: {
                    Authorization: `Bearer TEST-2735218977605833-012419-e6d876a59733cd50c1253ffd9c89fa90-1651807239`
                }
            });
        await User.update(
            {compras: Sequelize.literal( `"compras" || ARRAY['${JSON.stringify(mercadoPagoResponse.data)}']::json[]`) },
            { where: { id: response.id } }
          ); 
            console.log("este es mercado status",mercadoPagoResponse.data.status)
          if(mercadoPagoResponse.data.status === "approved"){
            const remove = await CartItem.destroy({ where: { idUser: idKeyString } })
            console.log("eliminando",remove)
          }
          console.log(mercadoPagoResponse)
        console.log("prueba depues", payment)
        console.log("esta es la response" , response)
        // const record = await Record.create({ userId: response.id });
        res.send("webhook")
    }
} catch(error){
    console.error(error);
      res.status(500).json({
        error: "Error al procesar el webhook",
      });
}
}

module.exports = {createOrder,receiveWebhooks}