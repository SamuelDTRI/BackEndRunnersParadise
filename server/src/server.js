const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
// const transporter = require("./config/config");

// try {
//   await transporter.sendMail({
//     from: '"Forgot Password 👻" <sariditri31@gmail.com>', // sender address
//     to: user.username, // list of receivers
//     subject: "Forgot Password ✔", // Subject line
//     html: `<b> Please Click on the following link, or paste in your browser to complete the process: </b>
//     <a href="${verificationLink}"></a>`, // html body
//   });
// } catch (error) {}

const server = express();

server.use(bodyParser.json());
server.use(morgan("dev"));
server.use(express.json());
server.use(cors("*"));
server.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);
server.use("/", router);

module.exports = server;
