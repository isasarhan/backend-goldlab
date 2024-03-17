const express = require("express");
const dotenv = require("dotenv");
const app = express();
const dbConnect = require("./config/dbConnect.js");
dotenv.config();
const cors = require("cors");
app.use(cors());
dbConnect();

const path = require("path");
const upload = require('./middleware/uploadMiddleware.js')

app.post("/api/upload", upload.single("file"), function (req, res) {
  console.log(req.file);
  res.send("file saved on server");
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

require("./start/routes.js")(app);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`listening to port ${PORT}`));
