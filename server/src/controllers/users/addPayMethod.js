const { Sequelize } = require('sequelize');
const { User } = require("../../db")

/* const addPaymentController = async (req, res) => {
  try {

    const userId = req?.body?.id; // Aquí debes obtener el ID del usuario de alguna manera
    console.log (userId)
    console.log (userId)
    console.log (userId)

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const currentPaymentMethods = user.paymentMethods || [];

    currentPaymentMethods.push(req.body);

    await user.update({ paymentMethods: currentPaymentMethods });

    return res.status(200).json({ message: 'Método de pago agregado exitosamente' });
  } catch (error) {
    console.error('Error al agregar método de pago:', error);
    return res.status(500).json({ error: console.log(error) });
  }
};

module.exports = addPaymentController; */

const addPaymentController = async (req, res) => {
    try {
      
      const userId = req?.body?.id; 
      
      const user = await User.findOne({ where: { id: userId } });
      
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      const currentPaymentMethods = user.paymentMethods || [];

      currentPaymentMethods.push(req?.body);

      await user.update({ paymentMethods: currentPaymentMethods });

      return res.status(200).json({ message: 'Método de pago agregado exitosamente' });
    } catch (error) {
      console.error('Error al agregar método de pago:', error);
      return res.status(500).json({ error: console.log(error) });
    }
  };

  module.exports = addPaymentController;