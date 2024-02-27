const asyncHandler = require("express-async-handler");
const { Payment, validatePayment } = require("../models/Payment");
const { Customer } = require("../models/Customer");
const { getCustomerName } = require("./customerController");

const getAllPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find();
  if (!payments) return res.send("no payments were found!").status(404);
  res.json(payments).status(200);
});

const getPaymentById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const payment = await Payment.findById(id);
  if (!payment) return res.send("payment not found!").status(404);
  res.json(payment).status(200);
});
const getPaymentByCustomerId = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const customer = await Customer.findById(id);
  if (!customer) return res.send("customer not found!").status(404);
  const payment = await Payment.find({ "customer.customerid": id });
  res.json(payment);
});
const getPaymentByCustomerIdBetweenDates = asyncHandler(async (req, res) => {
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);
  const customerid = req.query.customerid;

  console.log(req.query.startDate);
  const payments = await Payment.find(
    customerid
      ? {
          "customer.customerid": customerid,
          date: { $gte: startDate, $lte: endDate },
        }
      : { date: { $gte: startDate, $lte: endDate } }
  );

  if (!payments) return res.send("no payments were found").status(404);

  res.json(payments).status(404);
});
const addPayment = asyncHandler(async (req, res) => {
  const { error } = validatePayment(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const customer = await getCustomerName(req.body.customerid);

  const payment = new Payment({
    customer: {
      customerid: customer.id,
      name: customer.cname,
    },
    date: req.body.date,
    cash: req.body.cash,
    currency: req.body.currency,
    karat: req.body.karat,
    weight: req.body.weight,
    description: req.body.description,
  });
  const result = await payment.save();
  res.json(result).status(200);
});

module.exports = {
  getAllPayments,
  addPayment,
  getPaymentByCustomerId,
  getPaymentByCustomerIdBetweenDates,
  getPaymentById,
};
