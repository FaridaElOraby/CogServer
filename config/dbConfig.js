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

      const saltKey = bcrypt.genSaltSync(salt);
      const hashed_pass = bcrypt.hashSync("12345678", saltKey);
    })
    .catch((err) => console.log(err));
};

module.exports = { connectDB };
