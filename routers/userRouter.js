const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  updateUserById,
} = require("../controller/userController");

router.route("/:id").get(getUserById).put(updateUserById);
router.route("/").get(getAllUsers);
module.exports = router;
