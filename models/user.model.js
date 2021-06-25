//Require Mongoose
const { bool, boolean } = require("joi");
var mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
var { gender } = require("../api/constants/enums");

//Define a schema
var Schema = mongoose.Schema;

var user = new Schema({
  username: { type: String },
  password: { type: String },
  gender: {
    type: String,
    enum: [gender.MALE, gender.FEMALE],
  },
  id: { type: String },
  phase: { type: String },
  birthyear: { type: Number },
  educationalLevel: { type: String },
  mentalIllness: { type: String },
  notes: { type: String },
  medication: { type: String },
  caffeine: { type: Number },
});

var usermodel = mongoose.model("user", user);

module.exports = usermodel;
