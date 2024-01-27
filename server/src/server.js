const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const server = express();
server.use(morgan("dev"));
server.use(express.json());
const corsOptions = {
  origin: '*',  
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  
  preflightContinue: false,
  optionsSuccessStatus: 204
}

server.use(cors(corsOptions));

server.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);
server.use("/", router);

module.exports = server;
