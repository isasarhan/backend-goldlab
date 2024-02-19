const asyncHandler = require("express-async-handler");
const { Customer } = require("../models/Customer");
const { validateOrder, Order } = require("../models/Order");
const { getCustomerName } = require("./customerController");

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  if (!orders) return res.status(404).send("error retreving orders!");
  return res.json(orders).status(200);
});

const getOrderById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  if (!order) {
    res.status(404);
    throw new Error("order not found!");
  }
  res.json(order).status(200);
});

const addOrder = asyncHandler(async (req, res) => {
  const { error } = validateOrder(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  
  const customer = await getCustomerName(req.body.customerid)

  const order = new Order({
    customer: {
      customerid: req.body.customerid,
      name: customer.cname,
    },
    date: req.body.date,
    weight: req.body.weight,
    karat: req.body.karat,
    perGram: req.body.perGram,
    perItem: req.body.perItem,
    type: req.body.type,
    description: req.body.description,
  });
  if (!order) return res.send("error creating order!");
  const result = await order.save();
  res.json(result).status(200);
});

const updateOrder = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { error } = validateOrder(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  
  const customer = await getCustomerName(req.body.customerid);

  const order = await Order.findByIdAndUpdate(
    id,
    {
      customer: {
        customerid: customer.id,
        name: customer.cname,
      },
      date: req.body.date,
      weight: req.body.weight,
      karat: req.body.karat,
      perGram: req.body.perGram,
      perItem: req.body.perItem,
      type: req.body.type,
      description: req.body.description,
    },
    { new: true }
  );
  if (!order) return res.status(404).send("order not found!");
  res.json(order).status(200);
});

const deleteOrder = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await Order.findByIdAndDelete(id);
  if (!result) return res.send("error deleting order!");
  res.json(result).status(200);
});

module.exports = {
  getOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
};
