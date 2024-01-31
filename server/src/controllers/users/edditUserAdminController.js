const { User } = require("../../db");

const Useradmin = async (req, res) => {
  const userId = req.params.userId; // Cambia de idKey a userId
  const updatedUserData = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Actualizar los datos del usuario
    await user.update(updatedUserData);

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  Useradmin,
};