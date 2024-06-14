const asyncHandler = require("express-async-handler");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { model, Schema } = require("mongoose");
const ObjectId = Schema.ObjectId;

const InvoiceSchema = new Schema({
  invoiceNumber: { type: Number },
  customer: {
    _id: false,
    customerid: { type: String, required: true },
    cname: { type: String, required: true },
  },
  orders: [
    {
      _id: false,
      orderid: {
        type: ObjectId,
        required: true,
      },
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Order'
    // }
    },
  ],
  totalWeight: { type: Number },
  totalCash: { type: Number },
  date: {
    type: Date,
    default: Date.now,
  },
});


const Invoice = model("Invoice", InvoiceSchema);
function validateInvoice(invoice) {
  const schema = Joi.object({
    orderid: Joi.objectId(),
    customerid: Joi.objectId(),
    invoiceNumber: Joi.number(),
    totalWeight: Joi.number(),
    totalCash: Joi.number(),
    orders: Joi.array(),
    date: Joi.date()
  });
  return schema.validate(invoice);
}
module.exports = { Invoice, validateInvoice };
