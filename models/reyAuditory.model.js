//Require Mongoose
const { bool, boolean } = require("joi");
var mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

//Define a schema
var Schema = mongoose.Schema;

var reyAuditory = new Schema({
  username: { type: String },
  word: { type: String },
  round: { type: Number },
  timePassed: { type: String },
});

var reyAuditorymodel = mongoose.model("reyAuditory", reyAuditory);

module.exports = reyAuditorymodel;
