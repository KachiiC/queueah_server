const mongoose = require(".");
const Schema = mongoose.Schema;
const { urlTypes } = require("../helpers/validate.helpers");

const eventsSchema = new Schema({
  address: String,
  admitted: Number,
  adults_only: Boolean,
  attendees: { type: Number, default: 0 },
  date: Date,
  description: String,
  event_name: String,
  not_admitted: Number,
  organizer: String,
  venue_name: String,
  website: urlTypes,
});

const Events = mongoose.model("events", eventsSchema);

module.exports = Events;
