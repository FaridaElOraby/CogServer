//Require Mongoose
const { bool, boolean } = require("joi");
var mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

//Define a schema
var Schema = mongoose.Schema;

var lexical = new Schema({
  username: { type: String },
  word: { type: String },
});

var lexicalmodel = mongoose.model("lexical", lexical);

module.exports = lexicalmodel;
