//Require Mongoose
const { bool, boolean } = require("joi");
var mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

//Define a schema
var Schema = mongoose.Schema;

var patternMeta = new Schema({
  metaAnswer: { type: String },
  username: { type: String },
});

var patternMetamodel = mongoose.model("patternMeta", patternMeta);

module.exports = patternMetamodel;
