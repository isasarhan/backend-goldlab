const express = require("express");
const customerRouter = require("../routers/customerRouter.js");
const balanceRouter = require("../routers/balanceRouter.js");
const orderRouter = require("../routers/orderRouter.js");
const paymentRouter = require("../routers/paymentRouter.js");
const invoiceRouter = require("../routers/invoiceRouter.js");
const authRouter = require("../routers/authRouter.js");
const userRouter = require("../routers/userRouter.js");
const inventoryRouter = require("../routers/inventoryRouter.js");
const supplierRouter = require("../routers/supplierRouter.js");
const supplyRouter = require("../routers/supplyRouter.js");
const { notFound, errorHandler } = require("../middleware/errorMiddleware.js");

module.exports = (app) => {
  app.use(express.json());
  app.use("/api/customers", customerRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);
  app.use("/api/balances", balanceRouter);
  app.use("/api/orders", orderRouter);
  app.use("/api/payments", paymentRouter);
  app.use("/api/invoices", invoiceRouter);
  app.use("/api/inventory", inventoryRouter);
  app.use("/api/supplier", supplierRouter);
  app.use("/api/supply", supplyRouter);
  app.use(notFound);
  app.use(errorHandler);
};
