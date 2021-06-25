//Require Mongoose
const { bool, boolean } = require("joi");
var mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

//Define a schema
var Schema = mongoose.Schema;

var patternAnswer = new Schema({
  modelAnswer: { type: [Number] },
  username: { type: String },
});

var patternAnswermodel = mongoose.model("patternAnswer", patternAnswer);

module.exports = patternAnswermodel;
