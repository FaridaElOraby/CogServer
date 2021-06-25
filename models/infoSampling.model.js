//Require Mongoose
const { bool, boolean } = require("joi");
var mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

//Define a schema
var Schema = mongoose.Schema;

var infoSampling = new Schema({
  username: { type: String },
  evaluation: { type: String },
  round: { type: Number },
  openBags: { type: Number },
  openClothes: { type: Number },
  correctAnswer: { type: String },
  userAnswer: { type: String },
  timePassed: { type: String },
});

var infoSamplingmodel = mongoose.model("infoSampling", infoSampling);

module.exports = infoSamplingmodel;
