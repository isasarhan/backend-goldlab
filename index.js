const express = require("express");
const dotenv = require("dotenv");
const app = express();
const dbConnect = require("./config/dbConnect.js");
dotenv.config();
const cors = require('cors')
app.use(cors())
dbConnect();

require('./start/routes.js')(app)


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`listening to port ${PORT}`));



// var multer = require("multer");

// const storage = multer.diskStorage({
//       destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, "uploads"));
//       },
//       filename: function (req, file, cb) {
//         cb(
//           null,
//           file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//         );
//       },
//     });

//     const upload = multer({ storage: storage });

// app.post("/api/upload", upload.single("file"), function (req, res) {
//   console.log(req.file);
//   res.send("file saved on server");
// });
// const path = require("path");
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, path.join(__dirname, "uploads"));
// //   },
// //   filename: function (req, file, cb) {
// //     cb(
// //       null,
// //       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
// //     );
// //   },
// // });


// // app.post("/api/upload", upload.single("image"), (req, res) => {
// //   // Access the uploaded file using req.file
// //   // Save the file or perform further processing as needed

// //   res.json({ message: "Image uploaded successfully" });
// // });
// // Set up a route to serve static files (e.g., images) from the 'uploads' directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

