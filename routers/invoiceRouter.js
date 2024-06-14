const express = require("express");
const router = express.Router();
const {
  getInvoices,
  addInvoice,
  deleteInvoice,
  updateInvoiceById,
  getInvoiceById,
  getInvoicesByCustomerId,
} = require("../controller/invoiceController");

router.route("/customers/:id").get(getInvoicesByCustomerId)
router
.route("/:id")
.get(getInvoiceById)
.put(updateInvoiceById)
.delete(deleteInvoice);

router.route("/").get(getInvoices).post(addInvoice);

module.exports = router;
