const { Router } = require("express");
const allUsersHandler = require("../handlers/users/allUsersHandler");
const postUsersHandler = require("../handlers/users/postUsersHandler")
const validateUsers=require("../middlewares/users/usersMiddleware");
const usersRouter = Router();

usersRouter.get("/", allUsersHandler);
usersRouter.post("/create",validateUsers, postUsersHandler);

module.exports = usersRouter;
