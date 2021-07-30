/** @format */

const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected...");
  } catch (err) {
    console.log(`Db Connection Fail.`);
    process.exit(1);
  }
};

module.exports = dbConnection;
