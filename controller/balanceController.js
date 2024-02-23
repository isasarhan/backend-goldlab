const asyncHandler = require("express-async-handler");
const { Balance, validateBalance } = require("../models/Balance");
const { getCustomerName } = require("./customerController");

const getBalances = asyncHandler(async (req, res) => {
  const balances = await Balance.find();
  if (!balances) res.send("no balances").status(404);
  res.status(200).json(balances);
});

const getBalanceById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const balance = await Balance.findById(id);
  if (!balance) return res.send("no balance found!").status(404);
  res.status(200).json(balance);
});
const getBalanceByCustomerId = asyncHandler(async (req, res) => {
  const customerid = req.params.id;
  const balance = await Balance.find({
    "customer.customerid": customerid,
  });
  if (!balance) return res.send("no balance found!").status(404);
  res.status(200).json(balance);
});

const addNewBalance = asyncHandler(async (req, res) => {
  const { error } = validateBalance(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const customer = await getCustomerName(req.body.customerid);
  const balance = new Balance({
    customer: {
      customerid: customer.id,
      name: customer.cname,
    },
    cash: req.body.cash,
    gold: req.body.gold,
  });
  await balance.save();
  res.json(balance);
});

const updateBalance = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { error } = validateBalance({
    id,
    ...req.body,
  });
  if (error) return res.status(400).send(error.details[0].message);

  const balance = await Balance.findByIdAndUpdate(req.params.id, {
    customer: {},
  });

  if (!balance) return res.status(404).send("balance not found!");

  res.status(200).send("no error");
});

const deleteBalance = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const balance = await Balance.findByIdAndDelete(id);
  if (!balance) res.status(404).send("balance not found");
  res.status(200).json(balance);
});

module.exports = {
  getBalances,
  getBalanceById,
  getBalanceByCustomerId,
  addNewBalance,
  updateBalance,
  deleteBalance,
};
