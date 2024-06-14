const express = require("express");
const router = express.Router();

const {
  addOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");

router.route("/:id").get(getOrderById).delete(deleteOrder).put(updateOrder);
router.route("/").get(getOrders).post(addOrder);
module.exports = router;
