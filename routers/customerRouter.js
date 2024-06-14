const express = require("express");
const router = express.Router();
const {
  getAllCustomers,
  addNewCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controller/customerController.js");
const { authenticate } = require("../middleware/authMiddleware.js");
const { authorize } = require("../middleware/adminMiddleware.js");

router
.route("/:id")
.get(getCustomerById)
.put(updateCustomer)
.delete(deleteCustomer);
router.route("/").get(getAllCustomers).post(addNewCustomer);

module.exports = router;
