const {MercadoPagoConfig, Preference} = require( "mercadopago");
require('dotenv').config();

const createOrder = async (req,res) => {
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
            success: "https://www.youtube.com/",
            failure: "https://www.youtube.com/",
            pending: "https://www.youtube.com/"
        },
        auto_return: "approved"
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

module.exports = {createOrder}