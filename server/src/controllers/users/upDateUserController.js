const { User, Cart } = require("../../db");
const nodemailer = require("nodemailer");

const updateUser = async (req, res) => {
  const { idKey } = req.params;
  const updatedFields = req.body;

  try {
    const user = await User.findByPk(idKey);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const userFields = user.toJSON();
    Object.assign(userFields, updatedFields);

    await user.update(userFields);

    // Envía el correo electrónico de actualización
    await sendUpdateEmail(
      userFields.name,
      userFields.surName,
      userFields.email
    );

    return res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

const sendUpdateEmail = async (name, surName, email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "runnersparadisecompany@gmail.com",
      pass: "uorm sckl nuoo zfcc",
    },
  });

  try {
    const message = {
      from: "runnersparadisecompany@gmail.com",
      to: email,
      subject: "¡Tus datos en Runners Paradise han sido actualizados!",
      html: `
        <div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f4f4f4;">
          <h2 style="text-align: center; color: #333; margin-top: 20px;">¡Hola ${name} ${surName}!</h2>
          <p style="text-align: center; color: #555; font-size: 16px;">Te informamos que tus datos en Runners Paradise han sido actualizados correctamente.</p>
          <p style="text-align: center; color: #555; font-size: 16px;">Si no realizaste esta acción, por favor contáctanos de inmediato.</p>
          <p style="text-align: center; color: #555; font-size: 16px;">¡Gracias por ser parte de Runners Paradise!</p>
          <p style="text-align: center; color: #888; font-size: 14px;">Atentamente,<br>El equipo de Runners Paradise</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(message);
    console.log("Correo electrónico de actualización enviado:", info);
  } catch (error) {
    console.error(
      "Error al enviar el correo electrónico de actualización:",
      error
    );
    throw error;
  } finally {
    transporter.close();
  }
};

module.exports = { updateUser };
