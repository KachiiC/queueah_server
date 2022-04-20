const mongoose = require(".");
const Schema = mongoose.Schema;
const { scannedTypes, genderTypes } = require("../helpers/attendee.helpers");
const { emailTypes } = require("../helpers/validate.helpers");

const attendeesSchema = new Schema({
  event_id: String,
  email: emailTypes,
  first_name: String,
  gender: genderTypes,
  scanned: scannedTypes,
  surname: String,
  tickets: Number,
});

const Attendees = mongoose.model("attendees", attendeesSchema);

module.exports = Attendees;
