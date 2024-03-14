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

router.route("/").get(authenticate,getAllCustomers).post(addNewCustomer);
router
  .route("/:id")
  .get(getCustomerById)
  .put(updateCustomer)
  .delete(deleteCustomer);

module.exports = router;
