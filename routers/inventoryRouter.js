const express = require("express");
const {
  getInventories,
  addInventory,
  getInventoryById,
  deleteInventoryById,
  updateInventory,
  updateMainInventory,
  getMainInventory,
} = require("../controller/inventoryController");

const router = express.Router();


router.route("/main").put(updateMainInventory).get(getMainInventory);
router.route("/:id").get(getInventoryById).delete(deleteInventoryById);
router.route("/").get(getInventories).post(addInventory).put(updateInventory);
module.exports = router;
