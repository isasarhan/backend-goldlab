const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  updateUserById,
} = require("../controller/userController");

router.route("/").get(getAllUsers);
router.route("/:id").get(getUserById).put(updateUserById);
module.exports = router;
