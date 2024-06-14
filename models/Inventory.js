const Joi = require("joi");
const { Schema, model } = require("mongoose");

const inventorySchema = new Schema({
  name: { type: String, unique: true },
  weight: { type: Number, default: 0 },
  cash: { type: Number, default: 0 },
});
inventorySchema.pre("update", async function (next) {
  const inventory = this;
  
  next();
});
const Inventory = model("Inventory", inventorySchema);

function validateInventory(inventory) {
  const schema = Joi.object({
    name: Joi.string(),
    weight: Joi.number(),
    cash: Joi.number(),
  });
  return schema.validate(inventory);
}

module.exports = { Inventory, validateInventory };
