const express = require("express");
const route = express.Router();
const userController = require("../controllers/userController");

route.get("/list", userController.index);
route.post("/add", userController.add);
route.put("/update/:id", userController.update);
route.get("/getSingleUser/:id", userController.getSingleUser);
route.delete("/delete/:id", userController.deleteUser);

module.exports = route;