const express = require("express");
const Router = express.Router();
const { register, login, updateProfile } = require("../controller/authController")
const singleUpload = require("../middlewere/multer");
const { isAuthorised } = require("../middlewere/auth")

Router.post("/register", register);
Router.post("/login", login);
Router.put("/update", isAuthorised, singleUpload, updateProfile);


module.exports = Router