const { addAttendees, getAttendees, scanAttendees } = require("./attendees.controllers");
const { addEvent, getEvent } = require("./events.controllers");
const { organizerFinder } = require("./organizers.controllers");

module.exports = {
  // ATTENDEES
  addAttendees,
  getAttendees,
  scanAttendees,
  // EVENTS
  addEvent,
  getEvent,
  // ORGANIZERS
  organizerFinder
};
