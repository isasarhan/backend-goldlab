const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const { Schema, model } = require("mongoose");

const supplySchema = new Schema({
  supplier: { 
    _id: false,
    supplierid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
  },
  weight: { type: Number, default: 0 },
  karat: { type: Number, default: 0 },
  perGram: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  description: { type: String },
});

const Supply = model("Supply", supplySchema);
 
function validateSupply(supply) {
  const schema = Joi.object({
    supplierid: Joi.objectId(),
    weight: Joi.number(),
    karat: Joi.number(),
    perGram: Joi.number(),
    date: Joi.date(),
    description: Joi.allow(),
  });
  return schema.validate(supply);
}

module.exports = { Supply, validateSupply };
