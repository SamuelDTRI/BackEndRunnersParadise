const { Router } = require("express");
const allUsersHandler = require("../handlers/users/allUsersHandler");
const postUsersHandler = require("../handlers/users/postUsersHandler")
const usersById = require("../handlers/users/usersById")
const validateUsers=require("../middlewares/users/usersMiddleware");
const {login} = require("../controllers/users/loginController");
const {updateUser} = require ("../controllers/users/upDateUserController")
const usersRouter = Router();

usersRouter.get("/", allUsersHandler);
usersRouter.post("/create",validateUsers, postUsersHandler);
usersRouter.post("/login", login);
usersRouter.get("/detail/:idKey", usersById);
usersRouter.put("/perfil/:idKey" , updateUser)
module.exports = usersRouter;
