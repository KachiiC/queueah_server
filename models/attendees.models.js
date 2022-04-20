const mongoose = require(".");
const emailType = require("../helpers/email.helper");
const { scannedTypes, genderTypes } = require("../helpers/attendee.helpers");
const Schema = mongoose.Schema;

const attendeesSchema = new Schema({
  event_id: String,
  email: emailType,
  first_name: String,
  gender: genderTypes,
  scanned: scannedTypes,
  surname: String,
  tickets: Number,
});

const Attendees = mongoose.model("attendees", attendeesSchema);

module.exports = Attendees;
