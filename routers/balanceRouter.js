const express = require("express");
const router = express.Router();
const {
  getBalances,
  addNewBalance,
  updateBalance,
  getBalanceById,
  deleteBalance,
  getBalanceByCustomerId,
} = require("../controller/balanceController.js");

router.route("/customer/:id").get(getBalanceByCustomerId)
router
.route("/:id")
.get(getBalanceById)
.put(updateBalance)
.delete(deleteBalance);
router.get("/", getBalances).post("/", addNewBalance);
module.exports = router;
