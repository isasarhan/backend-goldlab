const express = require("express");
const router = express.Router();

const {
  getAllPayments,
  addPayment,
  getPaymentByCustomerId,
  getPaymentById,
  getPaymentByCustomerIdBetweenDates,
} = require("../controller/paymentController");

router.route("/dates").get(getPaymentByCustomerIdBetweenDates);
router.route("/customer/:id").get(getPaymentByCustomerId);
router.route("/:id").get(getPaymentById);
router.route("/").get(getAllPayments).post(addPayment);

module.exports = router;