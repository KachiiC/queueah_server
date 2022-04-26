// ROUTER
const KoaBody = require('koa-body')
const Router = require("koa-router");
const router = new Router();
// CONTROLLERS
const {
  // ATTENDEES
  addAttendees,
  getAttendees,
  // EVENTS
  addEvent,
  getEvent,
  // ORGANIZERS
  organizerFinder,
  scanAttendees,
  // EMAIL
  sendEventEmails,
  deleteAttendee
} = require("./controllers");
const { getSingleAttendee } = require('./controllers/attendees.controllers');
const { getOrganizerEvents } = require('./controllers/events.controllers');

const bodyArg = { 
  multipart: true, 
  uploadDir: '.' 
}

router
  .get("", ctx => ctx.body = "Home route")
  // ATTENDEES
  .get("/attendees_list/:input_organizer/:input_event", getAttendees)
  .get("/single_attendee/:input_organizer/:input_event/:attendee_id", getSingleAttendee)
  .post("/add_attendees/:input_organizer/:input_event", KoaBody(bodyArg), addAttendees)
  .delete("/delete_attendee/:attendee_id", deleteAttendee)
  .put("/scan/:attendee_id", scanAttendees)

  // EVENTS
  .post("/add_event", addEvent)
  .get("/events/:organizer_id", getOrganizerEvents)
  .get("/event/:input_organizer/:input_event", getEvent)
  // ORGANIZERS
  .put("/organizer", organizerFinder)
  // EMAIL
  .post("/email", sendEventEmails)

module.exports = router;
