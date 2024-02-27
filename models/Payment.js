const { Schema, model } = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const schema = new Schema(
  {
    customer: {
      _id: false,
      customerid: { type: String, required: true },
      name: { type: String, required: true },
    },
    date: { type: Date, default: Date.now() },
    weight: { type: Number },
    karat: { type: Number },
    cash: { type: Number },
    currency: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

function validatePayment(payment) {
  const schema = Joi.object({
    date:Joi.date(),
    customerid: Joi.objectId(),
    id: Joi.objectId(),
    weight: Joi.number(),
    karat: Joi.number(),
    cash: Joi.number(),
    currency: Joi.string(),
    description: Joi.string(),
  });
  return schema.validate(payment);
}

const Payment = model("Payment", schema);
module.exports = { Payment, validatePayment };
