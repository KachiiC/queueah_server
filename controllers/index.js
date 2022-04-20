const { addAttendees, getAttendees } = require("./attendees.controllers");
const { addEvent, getEvents } = require("./events.controllers");
const { addOrganizer, getOrganizer } = require("./organizers.controllers");

module.exports = {
  // ATTENDEES
  addAttendees,
  getAttendees,
  // EVENTS
  addEvent,
  getEvents,
  // ORGANIZERS
  addOrganizer,
  getOrganizer,
};
