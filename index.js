const express = require("express");
const dotenv = require("dotenv");
const app = express();
const customerRouter = require("./routers/customerRouter.js");
const balanceRouter = require("./routers/balanceRouter.js");
const orderRouter = require("./routers/orderRouter.js");
const paymentRouter = require("./routers/paymentRouter.js");
const invoiceRouter = require("./routers/invoiceRouter.js")
const dbConnect = require("./config/dbConnect.js");
dotenv.config();
app.use(express.json());

dbConnect();

require('./start/routes.js')(app)



const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`listening to port ${PORT}`));
