const mongoose = require(".");
const Schema = mongoose.Schema;

const organizersSchema = new Schema({
  name: String,
  email: String,
  events: [String],
});

const Organizers = mongoose.model("organizers", organizersSchema);

module.exports = Organizers;
