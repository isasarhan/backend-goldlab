const asyncHandler = require("express-async-handler");
const { Inventory, validateInventory } = require("../models/Inventory");

const getInventories = asyncHandler(async (req, res) => {
  const result = await Inventory.find();
  res.json(result);
});
const getMainInventory = asyncHandler(async(req,res)=>{
  let inventory = await Inventory.findOne().where({ name: "main" });
  if (!inventory) return res.send("main inventory not found")
  res.json(inventory)
})
const addInventory = asyncHandler(async (req, res) => {
  const { error } = validateInventory(req.body);
  if (error) return res.send(error.details[0].message);
  const inventory = new Inventory({
    name: req.body.name,
    cash: req.body.cash,
    weight: req.body.weight,
  });

  const result = await inventory.save();
  if (!result) return res.send("error saving inventory");
  res.json(result);
});

const getInventoryById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const inventory = await Inventory.findById(id);
  if (!inventory) return res.send("inventory not found");
  res.json(inventory).status(200);
});

const deleteInventoryById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const inventory = await Inventory.findByIdAndDelete(id);
  if (!inventory) return res.send("inventory not found");
  res.json(inventory);
});
const updateInventory = asyncHandler(async (req, res) => {
  const { error } = validateInventory(req.body);
  if (error) return res.send(error.details[0].message);
  let inventory = await Inventory.findOne().where({ name: "main" });
  if (!inventory) {
    const invent = new Inventory({ name: "main" });
    inventory = await invent.save();
  }
  const updated = await Inventory.findByIdAndUpdate(
    inventory._id,
    {
      weight: req.body.weight,
      cash: req.body.cash,
    },
    { new: true }
  );
  if (!updated) return res.send("error updating inventory").status(400);
  res.json(updated);
});
const updateMainInventory = asyncHandler(async (req, res) => {
  const { error } = validateInventory(req.body);
  if (error) return res.send(error.details[0].message);
  let inventory = await Inventory.findOne().where({ name: "main" });
  if (!inventory) {
    const invent = new Inventory({ name: "main" });
    inventory = await invent.save();
  }
  const updated = await Inventory.findByIdAndUpdate(
    inventory._id,
    {
      weight: inventory.weight + req.body.weight,
      cash: inventory.cash + req.body.cash,
    },
    { new: true }
  );
  if (!updated) return res.send("error updating inventory").status(400);
  res.json(updated);
});
module.exports = {
  getInventories,
  getMainInventory,
  addInventory,
  getInventoryById,
  updateInventory,
  updateMainInventory,
  deleteInventoryById,
};
