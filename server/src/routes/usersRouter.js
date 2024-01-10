const { Router } = require("express");
const allUsersHandler = require("../handlers/users/allUsersHandler");

const usersRouter = Router();

usersRouter.get("/", allUsersHandler);

module.exports = usersRouter;
