const mongoose = require('mongoose')
const dbConnect = async () => {
  try {
    const conn = await mongoose
      .connect(process.env.db)
      .then(console.log("connecting to db..."));
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = dbConnect