const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require ("express-fileupload")


const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
server.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}));
server.use("/",router);

module.exports = server;
