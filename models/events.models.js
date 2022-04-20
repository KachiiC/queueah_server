const mongoose = require(".");
const { urlTypes } = require("../helpers/validate.helpers");
const Schema = mongoose.Schema;

const eventsSchema = new Schema({
  address: String,
  adults_only: Boolean,
  attendees: Number,
  date: Date,
  description: String,
  event_name: String,
  organizer: String,
  venue_name: String,
  website: urlTypes,
});

const Events = mongoose.model("events", eventsSchema);

module.exports = Events;
