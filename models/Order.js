const { Schema, model } = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const schema = new Schema({
  customer: {
    _id: false,
    customerid: { type: String, required: true },
    name: { type: String, required: true },
  },
  weight: { type: Number, default: 0 },
  karat: { type: String, default: "18k" },
  perGram: { type: Number, default: 0 },
  perItem: { type: Number, default: 0 },
  type: { type: String },
  description: { type: String },
  date: { type: Date, default: Date.now() },
});
function validateOrder(order) {
  const schema = Joi.object({
    id: Joi.objectId(),
    customerid: Joi.objectId().required(),
    weight: Joi.number(),
    karat: Joi.string(),
    description: Joi.string().allow(),
    type: Joi.string(),
    perGram: Joi.number(),
    perItem: Joi.number(),
    date: Joi.date(),
  });
  return schema.validate(order);
}
const Order = model("Order", schema);

module.exports = { Order, validateOrder };
