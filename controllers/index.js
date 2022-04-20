const { addAttendees, getAttendees } = require("./attendees.controllers");
const { addEvent, getEvent } = require("./events.controllers");
const { addOrganizer, getOrganizer } = require("./organizers.controllers");

module.exports = {
  // ATTENDEES
  addAttendees,
  getAttendees,
  // EVENTS
  addEvent,
  getEvent,
  // ORGANIZERS
  addOrganizer,
  getOrganizer,
};
