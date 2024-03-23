const express = require("express");
const {
  getInventories,
  addInventory,
  getInventoryById,
  deleteInventoryById,
  updateInventory,
} = require("../controller/inventoryController");

const router = express.Router();

router.route("/").get(getInventories).post(addInventory);

router
  .route("/:id")
  .get(getInventoryById)
  .put(updateInventory)
  .delete(deleteInventoryById);
module.exports = router;
