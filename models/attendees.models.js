const mongoose = require(".");
const Schema = mongoose.Schema;
const { scannedTypes, genderTypes } = require("../helpers/attendee.helpers");
const { emailTypes } = require("../helpers/validate.helpers");

const attendeesSchema = new Schema({
  event_id: String,
  event_name: String,
  email: emailTypes,
  first_name: String,
  gender: genderTypes,
  scanned: scannedTypes,
  surname: String
});

const Attendees = mongoose.model("attendees", attendeesSchema);

module.exports = Attendees;
