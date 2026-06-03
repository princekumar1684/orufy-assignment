const mongoose = require("mongoose");
const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const authController = require("../controllers/auth.controller");

const router = express.Router();
router.post("/send-otp",  authController.sendOTP);
router.post("/verify-otp",  authController.verifyOTP);
router.get("/me", authMiddleware, authController.getMe);
router.post("/logout", authController.logout);

module.exports = router;
