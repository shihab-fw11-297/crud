const express = require("express");
const Router = express.Router();
const { createData, updateData, getData, deleteData, findSingleData } = require("../controller/crudController");

Router.post("/create", createData);
Router.get("/find", getData);
Router.put("/update/:id", updateData);
Router.delete("/delete/:id", deleteData);
Router.get("/find/:id", findSingleData);


module.exports = Router