const express = require("express");
const router = express.Router();
const {
  getBalances,
  addNewBalance,
  updateBalance,
  getBalanceById,
  deleteBalance,
} = require("../controller/balanceController.js");

router.get("/", getBalances).post("/", addNewBalance);
router
  .route("/:id")
  .get(getBalanceById)
  .put(updateBalance)
  .delete(deleteBalance);

module.exports = router;
