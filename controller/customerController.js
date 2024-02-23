const asyncHandler = require("express-async-handler");
const { Customer, validateCustomer } = require("../models/Customer");

const getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find();
  res.json(customers).status(200);
});

const addNewCustomer = asyncHandler(async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    cname: req.body.cname,
    email: req.body.email,
    phone: req.body.phone,
    location: req.body.location,
  });
  let result = await customer.save();
  res.status(200).json(result);
});
const getCustomerName = async (customerid) => {
  const customer = await Customer.findById(customerid).select("id cname");

  if (!customer) throw new Error(customer.errors.message);

  return customer;
};
const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send("Customer Not Found!");
  res.json(customer).status(200);
});

const updateCustomer = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const customer = await Customer.findByIdAndUpdate(
    id,
    {
      cname: req.body.name,
      email: req.body.email,
      location: req.body.location,
      phone: req.body.phone,
    },
    { new: true }
  );
  if (!customer) return res.status(404).send("customer not found");

  res.json(customer).status(200);
});

const deleteCustomer = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const customer = await Customer.findByIdAndDelete(id);
  if (!customer) return res.status(404).send("Customer Not Found!");
  res.send(customer);
});
module.exports = {
  getAllCustomers,
  addNewCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCustomerName,
};
