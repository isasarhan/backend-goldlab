const express = require("express");
const {
  addSupply,
  getSupplies,
  getSupplyById,
  getSuppliesBySupplierId,
  getSuppliesByDates,
} = require("../controller/supplyController");
const router = express.Router();
router.route("/supplier/:id").get(getSuppliesBySupplierId);

router.route("/dates").get(getSuppliesByDates);

router.route("/:id").get(getSupplyById);

router.route("/").get(getSupplies).post(addSupply);

module.exports = router;
