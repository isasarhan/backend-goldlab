const express = require("express");
const router = express.Router();
const { userRegister, userLogin } = require("../controller/authController");
const upload = require("../middleware/uploadMiddleware.js");

router.post("/register", upload.single("file"), userRegister);
router.post("/login", userLogin);

module.exports = router;