const express = require("express");
const authMiddleware = require("../middleware/userMiddleware");
const { registerUser, loginUser , getUserByID , updateUserData, logoutUser} = require("../controllers/userController");

const router = express.Router();

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

//getuserby id
router.get("/:id",authMiddleware,  getUserByID);

//update userbuid
router.put("/:id",authMiddleware, updateUserData);

//logout
router.post("/logout",  logoutUser )

module.exports = router;
