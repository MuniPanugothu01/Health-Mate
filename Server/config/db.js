const mongoose = require("mongoose");
// dotenv
const dotenv = require("dotenv");
dotenv.config();
const ConnectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};
ConnectDB()
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => {
    console.log("Not connected MongoDB",err);
  });
module.exports = {
  ConnectDB,
};
