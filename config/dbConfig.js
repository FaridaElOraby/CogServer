//Import the mongoose module
const mongoose = require("mongoose");
const { mongoURI } = require("./keys");
const bcrypt = require("bcryptjs");
const { salt } = require("./keys");

const connectDB = async () => {
  const uri = mongoURI;
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      console.log("MongoDB Connected…");
    })
    .catch((err) => console.log(err));
};

module.exports = { connectDB };
