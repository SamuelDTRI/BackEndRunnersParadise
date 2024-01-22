const { Router } = require("express");
const allUsersHandler = require("../handlers/users/allUsersHandler");
const postUsersHandler = require("../handlers/users/postUsersHandler")
const usersById = require("../handlers/users/usersById")
const validateUsers=require("../middlewares/users/usersMiddleware");
const usersRouter = Router();

usersRouter.get("/", allUsersHandler);
usersRouter.post("/create",validateUsers, postUsersHandler);
usersRouter.get("/detail/:idKey", usersById);
module.exports = usersRouter;
