const { addAttendees, getAttendees, scanAttendees, deleteAttendee } = require("./attendees.controllers");
const { addEvent, getEvent } = require("./events.controllers");
const { organizerFinder } = require("./organizers.controllers");
const sendEventEmails = require("./email.controllers");

module.exports = {
  // ATTENDEES
  addAttendees,
  getAttendees,
  scanAttendees,
  deleteAttendee,
  // EVENTS
  addEvent,
  getEvent,
  // ORGANIZERS
  organizerFinder,
  // EMAIL
  sendEventEmails,
};
