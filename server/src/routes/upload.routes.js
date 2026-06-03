const express = require("express");
const upload = require("../middleware/upload.mddleware");
const authMiddleware = require("../middleware/auth.middleware");

const uploadImageController = require("../controllers/upload.controller");

const router = express.Router();

router.post(
  "/image",
  authMiddleware,
  upload.single("image"),
  uploadImageController.uploadImage,
);

module.exports = router;
