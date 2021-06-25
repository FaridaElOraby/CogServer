//Require Mongoose
const { bool, boolean } = require("joi");
var mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

//Define a schema
var Schema = mongoose.Schema;

var simpleDetection = new Schema({
  round: { type: Number },
  reactionTime: { type: Number },
  username: { type: String },
  type: { type: String },
});

var simpleDetectionmodel = mongoose.model("simpleDetection", simpleDetection);

module.exports = simpleDetectionmodel;
