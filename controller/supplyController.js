const asyncHandler = require("express-async-handler");
const { Supply, validateSupply } = require("../models/Supply");
const { Supplier } = require("../models/Supplier");

const getSupplies = asyncHandler(async (req, res) => {
  const supplies = await Supply.find();
  res.json(supplies);
});

const addSupply = asyncHandler(async (req, res) => {
  const { error } = validateSupply(req.body);
  if (error) return res.send(error.details[0].message);

  const supplier = await Supplier.findById(req.body.supplierid);
  if (!supplier) return res.send("supplier not found");

  const supply = new Supply({
    supplier: {
      name: supplier.name,
      supplierid: req.body.supplierid,
    },
    date: req.body.date,
    perGram: req.body.perGram,
    karat: req.body.karat,
    description: req.body.description,
    weight: req.body.weight,
  });
  const result = await supply.save();
  if (!result) return res.send("error saving supply");

  res.json(result);
});
const getSupplyById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const supply = await Supply.findById(id);
  if (!supply) return res.send("supply not found");
  res.json(supply);
});
const getSuppliesBySupplierId = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const supply = await Supply.find({
    "supplier.supplierid": id,
  });
  if (!supply) return res.send("supplies not found");
  res.json(supply);
});
const getSuppliesByDates = asyncHandler(async (req, res) => {
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);
  const supplierid = req.query.supplierid;

  console.log(req.query);
  const supplies = await Supply.find(
    supplierid ? { "supplier.supplierid": supplierid } : {}
  )
    .where("date")
    .gte(startDate)
    .lte(endDate);
  console.log(supplies);
  if (!supplies) res.send("no supplies were found");
  res.json(supplies);
});

module.exports = {
  getSupplies,
  getSupplyById,
  getSuppliesByDates,
  getSuppliesBySupplierId,
  addSupply,
};
