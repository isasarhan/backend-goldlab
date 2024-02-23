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

router.get("/", getBalances).post("/", addNewBalance);
router
  .route("/:id")
  .get(getBalanceById)
  .put(updateBalance)
  .delete(deleteBalance);
router.route("/customer/:id").get(getBalanceByCustomerId)
module.exports = router;
