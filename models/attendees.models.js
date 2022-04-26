const mongoose = require(".");
const Schema = mongoose.Schema;
const { scannedTypes, genderTypes } = require("../helpers/attendee.helpers");
const { emailTypes } = require("../helpers/validate.helpers");

const attendeesSchema = new Schema({
  first_name: String,
  surname: String,
  email: emailTypes,
  gender: genderTypes,
  // automatically added
  event_name: String,
  event_id: String,
  scanned: scannedTypes,
});

const Attendees = mongoose.model("attendees", attendeesSchema);

module.exports = Attendees;
