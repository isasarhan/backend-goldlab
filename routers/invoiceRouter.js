const express = require("express");
const router = express.Router();
const {
  getInvoices,
  addInvoice,
  deleteInvoice,
  updateInvoiceById,
  getInvoiceById,
} = require("../controller/invoiceController");

router.route("/").get(getInvoices).post(addInvoice);
router
  .route("/:id")
  .get(getInvoiceById)
  .put(updateInvoiceById)
  .delete(deleteInvoice);

module.exports = router;
