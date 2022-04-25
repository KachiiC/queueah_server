const mongoose = require(".");
const Schema = mongoose.Schema;
const { urlTypes } = require("../helpers/validate.helpers");

const eventsSchema = new Schema({
  // Need to Add
  event_name: String,
  description: String,
  venue_name: String,
  address: String,
  website: urlTypes,
  start_date: Date,
  end_date: Date,
  adults_only: Boolean,
  // Automatically Added
  organizer: String,
  attendees: { type: Number, default: 0 },
  admitted: Number,
  not_admitted: Number,
});

const Events = mongoose.model("events", eventsSchema);

module.exports = Events;
