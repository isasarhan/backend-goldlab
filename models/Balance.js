const Joi = require("joi");
const { Schema, model } = require("mongoose");
Joi.objectId = require("joi-objectid")(Joi);

const schema = new Schema(
  {
    customer: {
      _id: false,
      customerid: { type: String, required: true, unique: true },
      name: { type: String, required: true },
    },
    gold: { type: Number, default: 0 },
    cash: { type: Number, default: 0 },
  },
  { timestamps: true }
);
const Balance = model("Balance", schema);

function validateBalance(balance) {
  const schema = Joi.object({
    id: Joi.objectId(),
    customerid: Joi.objectId().required(),
    gold: Joi.number(),
    cash: Joi.number(),
  });
  return schema.validate(balance);
}
module.exports = { Balance, validateBalance };
