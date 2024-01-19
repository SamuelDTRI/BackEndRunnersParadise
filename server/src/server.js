const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
// const nodemailer = require("nodemailer");

// // Función para enviar el correo
// const sendEmail = async () => {
//   const config = {
//     host: "smtp.gmail.com",
//     port: 587,
//     auth: {
//       user: "sariditri31@gmail.com",
//       pass: "xkli ntae gvjf uxcd", // Corregí "passw" a "pass"
//     },
//   };

//   const message = {
//     from: "sariditri31@gmail.com",
//     to: "@gmail.com",
//     subject: "correo de pruebas",
//     text: "Envio de correo desde node.js utilizando nodemailer",
//   };

//   // Crear el objeto de transporte fuera de la función sendEmail
//   const transport = nodemailer.createTransport(config);

//   try {
//     const info = await transport.sendMail(message);
//     console.log(info);
//   } catch (error) {
//     console.error("Error al enviar el correo:", error);
//   } finally {
//     // Cerrar el transporte después de enviar el correo
//     transport.close();
//   }
// };

// sendEmail();

const server = express();

server.use(bodyParser.json());
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
server.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);
server.use("/", router);

module.exports = server;
