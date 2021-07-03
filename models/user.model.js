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
  gender: { type: String },
  phase: { type: String },
  birthYear: { type: Number },
  educationalLevel: { type: String },
  mentalIllness: { type: String },
  notes: { type: String },
  caffiene: { type: Number },
  valid: { type: String },
});

var usermodel = mongoose.model("user", user);

module.exports = usermodel;
