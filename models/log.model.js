//Require Mongoose
const { bool, boolean } = require("joi");
var mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

//Define a schema
var Schema = mongoose.Schema;

var log = new Schema({
  username: { type: String },
  action: { type: String },
  timeStamp: { type: String },
  type: { type: String },
  scene: { type: String },
});

var logmodel = mongoose.model("log", log);

module.exports = logmodel;
