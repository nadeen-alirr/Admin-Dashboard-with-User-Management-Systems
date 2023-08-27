const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const Admin_controler=require("../Controller/AdminControler");


router.post("/superadmin", userController.createSuperAdmin);
router.post("/admin", userController.createAdmin);
router.post("/user/register", userController.registerUser);
router.post("/user/login", userController.loginUser);
router.post("/user/token", userController.Token);
router.get("/allUser", userController.AllUser);
router.delete("/delete/:id" ,Admin_controler.DeleteUser);
router.patch("/edit/:id" ,Admin_controler.EditUser);
router.post("/user/adduser",Admin_controler.add_user);
router.post('/user/createUser', Admin_controler.createUser);

module.exports = router;