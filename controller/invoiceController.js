const asyncHandler = require("express-async-handler");
const { Invoice, validateInvoice } = require("../models/Invoice");
const { getCustomerName } = require("./customerController");

const getInvoices = asyncHandler(async (req, res) => {
  const invoices = await Invoice.find();
  if (!invoices) return res.send("no invoices were found!").status(404);

  res.json(invoices).status(200);
});
const getInvoiceById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const invoice = await Invoice.findById(id);
  if (!invoice) return res.send("invoice not found!").send(404);
  res.json(invoice).status(200);
});
const addInvoice = asyncHandler(async (req, res) => {
  const { error } = validateInvoice(req.body);
  if (error) return res.send(error.details[0].message).status(400);

  const customer = await getCustomerName(req.body.customerid);

  const invoice = new Invoice({
    customer: {
      customerid: customer.id,
      name: customer.cname,
    },
    date: req.body.date,
    invoiceNumber: req.body.invoiceNumber,
    totalCash: req.body.totalCash,
    totalWeight: req.body.totalWeight,
    orders: req.body.orders,
  });
  const result = await invoice.save();
  if (!result) return res.send("error saving invoice!").status(400);

  res.json(result).status(200);
});
const updateInvoiceById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { error } = validateInvoice(req.body);
  if (error) return res.send(error.details[0].message);

  const customer = await getCustomerName(req.body.customerid);

  const invoice = await Invoice.findByIdAndUpdate(id, {
    customer: {
      cname: customer.cname,
      customerid: customer.id,
    },
    orders: req.body.orders,
    totalCash: req.body.totalCash,
    totalWeight: req.body.totalWeight,
    date: req.body.date,
  });

  res.json(invoice).status(200);
});
const deleteInvoice = asyncHandler(async (req, res) => {
  const deleted = await Invoice.findByIdAndDelete(req.params.id);
  if (!deleted) return res.send("error deleting invoice!").status(400);
  res.json(deleted).status(200);
});

module.exports = {
  getInvoices,
  getInvoiceById,
  addInvoice,
  deleteInvoice,
  updateInvoiceById,
};
