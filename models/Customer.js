const { model, Schema } = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const customerSchema = new Schema({
  cname: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  location: { type: String },
});
function validateCustomer(customer) {
  const schema = Joi.object({
    id: Joi.objectId(),
    cname: Joi.string().min(5),
    email: Joi.string().email(),
    phone: Joi.string(),
    location: Joi.string(),
  });

  return schema.validate(customer);
}

const Customer = model("Customer", customerSchema);
module.exports = { Customer, validateCustomer };
