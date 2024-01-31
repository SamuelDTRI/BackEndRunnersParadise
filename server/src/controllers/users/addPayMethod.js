const { User } = require("../../db");

exports.updatePaymentMethods = async (req, res) => {
    try {
      const { userId } = req.params; // Id del usuario que se actualizará
      const { number, brand, expirationDate, cvv } = req.body; // Datos actualizados
  
      // Verifica si el usuario existe
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Verifica si los datos son válidos
      if (!number || !brand || !expirationDate || !cvv) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }
  
      // Actualiza los paymentMethods del usuario
      user.paymentMethods = [{ number, brand, expirationDate, cvv }];
  
      // Guarda los cambios en la base de datos
      await user.save();
  
      // Responde con el usuario actualizado
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };