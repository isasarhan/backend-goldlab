const express = require("express");
const { getAllSuppliers, addSupplier, getSupplierById, updateSupplier, deleteSupplierById } = require("../controller/supplierController");
const router = express.Router();

router.route("/:id").get(getSupplierById).put(updateSupplier).delete(deleteSupplierById)

router.route("/").get(getAllSuppliers).post(addSupplier);

module.exports = router;
