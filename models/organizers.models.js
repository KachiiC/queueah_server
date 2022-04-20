const mongoose = require(".");
const Schema = mongoose.Schema;
const { emailTypes } = require("../helpers/validate.helpers");

const organizersSchema = new Schema({
  email: emailTypes,
  events: [String],
  name: String,
});

const Organizers = mongoose.model("organizers", organizersSchema);

module.exports = Organizers;
