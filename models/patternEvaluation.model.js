//Require Mongoose
const { bool, boolean } = require("joi");
var mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

//Define a schema
var Schema = mongoose.Schema;

var patternEvaluation = new Schema({
  username: { type: String },
  chosenPattern: { type: Number },
  evaluation: { type: String },
  round: { type: Number },
  timePassed: { type: String },
});

var patternEvaluationmodel = mongoose.model(
  "patternEvaluation",
  patternEvaluation
);

module.exports = patternEvaluationmodel;
