const { Router } = require("express");
const allUsersHandler = require("../handlers/users/allUsersHandler");
const postUsersHandler = require("../handlers/users/postUsersHandler");
const usersById = require("../handlers/users/usersById");
const validateUsers = require("../middlewares/users/usersMiddleware");
const { login } = require("../controllers/users/loginController");
const { updateUser } = require("../controllers/users/upDateUserController");  // Corregido aquí
const { updatePassword } = require("../controllers/users/upPasswordController");
const { updateMail } = require("../controllers/users/upDateMailController");
const { updateProfilePicture } = require("../controllers/users/upDatePictureController");
const { updatePaymentMethods } = require('../controllers/users/addPayMethod');
const { deleteUser } = require("../controllers/users/deleteUserController");
const { Useradmin } = require("../controllers/users/edditUserAdminController");

const usersRouter = Router();

usersRouter.get("/", allUsersHandler);
usersRouter.post("/create", validateUsers, postUsersHandler);
usersRouter.post("/login", login);
usersRouter.get("/detail/:idKey", usersById);
usersRouter.put("/perfil/:idKey", updateUser);
usersRouter.put("/perfil/updatepassword/:idKey", updatePassword);
usersRouter.put("/perfil/update/:idKey", updateMail);
usersRouter.put('/profile/picture/:idKey', updateProfilePicture);
usersRouter.put('/:userId/paymentMethods', updatePaymentMethods);
usersRouter.put("/eddituseradmin/:userId", Useradmin);
usersRouter.delete("/delete/:userId", deleteUser);

module.exports = usersRouter;