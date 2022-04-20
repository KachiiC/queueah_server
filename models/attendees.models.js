"use strict";
const mongoose = require(".");
const emailType = require("../helpers/email.helper");
const Schema = mongoose.Schema;

const genderTypes = {
  type: String,
  enum: ["male", "female"],
};

const scannedType = {
  type: Boolean,
  default: false,
};

const attendeesSchema = new Schema({
  event_id: String,
  email: emailType,
  first_name: String,
  gender: genderTypes,
  scanned: scannedType,
  surname: String,
  tickets: Number,
});

const Attendees = mongoose.model("attendees", attendeesSchema);

module.exports = Attendees;
