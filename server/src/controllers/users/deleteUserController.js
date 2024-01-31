const { User } = require("../../db");

const deleteUser = async (req, res) => {
    const userId = req.params.userId; // Cambiado a "userId" en lugar de "id"
  
    try {
      const user = await User.findByPk(userId);
  
      if (!user) {
        console.error(`Usuario con ID ${userId} no encontrado`);
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      await user.destroy();
  
      return res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };
  
  module.exports = {
    deleteUser,
  };