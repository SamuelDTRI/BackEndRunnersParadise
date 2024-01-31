const { User, Cart } = require("../../db");
const nodemailer = require("nodemailer");

const postUser = async (name, surName, email, password, rol) => {
  try {
    const maxId = await User.max("id");
    const newId = maxId + 1;
    const user = await User.create({
      id: newId,
      name,
      surName,
      email,
      password,
      rol
    });

    const cart = await Cart.create({ userId: user.id });

    await sendWelcomeEmail(name, surName, email);

    return user;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

const sendWelcomeEmail = async (name, surName, email) => {
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
      subject: "¡Bienvenido a Runners Paradise!",
      html: `
        <div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f4f4f4;">
          <img src="https://res.cloudinary.com/dugaeurmo/image/upload/v1705794624/icbwkvhxg0k5oep5vhr8.jpg" alt="Logo de Runners Paradise" style="width: 150px; height: auto; margin: 0 auto; display: block;">
          <h2 style="text-align: center; color: #333; margin-top: 20px;">¡Bienvenido a Runners Paradise, ${name} ${surName}!</h2>
          <p style="text-align: center; color: #555; font-size: 16px;">Gracias por unirte a nuestra comunidad. Estamos emocionados de tenerte como parte de Runners Paradise, donde encontrarás todo lo que necesitas para tus aventuras y carreras.</p>
          <p style="text-align: center; color: #555; font-size: 16px;">Explora nuestras últimas colecciones, realiza compras seguras y mantente al tanto de las últimas tendencias en el mundo del running.</p>
          <p style="text-align: center; color: #555; font-size: 16px;">Si tienes alguna pregunta o necesitas asistencia, nuestro equipo de soporte está aquí para ayudarte. ¡Esperamos que disfrutes de tu experiencia en Runners Paradise!</p>
          <p style="text-align: center; color: #555; font-size: 16px;">¡Bienvenido y a correr se ha dicho!</p>
          <p style="text-align: center; color: #888; font-size: 14px;">Atentamente,<br>El equipo de Runners Paradise</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(message);
    console.log("Correo electrónico de bienvenida enviado:", info);
  } catch (error) {
    console.error("Error al enviar el correo electrónico de bienvenida:", error);
    throw error;
  } finally {
    transporter.close();
  }
};

module.exports = { postUser };