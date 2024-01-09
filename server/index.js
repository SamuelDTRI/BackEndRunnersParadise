const express = require("express");
const { database } = require("./src/db");
const server = require("./src/server");
require("dotenv").config();

const port = 3000;

database.sync({ alter: true }).then(
  server.listen(port, () => {
    console.log("running in port", port);
  })
);
