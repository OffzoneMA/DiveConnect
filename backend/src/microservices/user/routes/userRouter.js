const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// User management routes
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logout);
router.put("/:id", userController.updateUserById);
router.delete("/:id", userController.deleteUserById);

// Authentication routes

module.exports = router;
