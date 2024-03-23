const Joi = require("joi");
const { Schema, model } = require("mongoose");

const supplierSchema = new Schema({
  name: { type: String, required: true },
  weight: { type: Number, default: 0 },
  cash: { type: Number, default: 0 },
  description: { type: String },
});
const Supplier = model("Supplier", supplierSchema);

function validateSupplier(supplier) {
  const schema = Joi.object({
    name: Joi.string(),
    weight: Joi.number(),
    cash: Joi.number(),
    description: Joi.allow(),
  });
  return schema.validate(supplier);
}

module.exports = { Supplier, validateSupplier };
