// ROUTER
const KoaBody = require('koa-body')
const Router = require("koa-router");
const router = new Router();
const { addAttendees, scanAttendee, getAttendee } = require('./controllers/attendee.controllers');
const sendEventEmails = require('./controllers/email.controllers');
const { addEvent, getEvent } = require('./controllers/event.controllers');
const organizerFinder = require('./controllers/organizer.controllers');
// HELPERS
const { attendeeBodyArg } = require('./helpers/attendee.helpers');

router
  .get("/", ctx => ctx.body = "Home route")
  // ORGANIZERS
  .patch("/organizer", organizerFinder)
  // EVENTS
  .post("/add_event", addEvent)
  .get("/event=:input_event&organizer=:input_organizer", getEvent)
  // ATTENDEES
  .post("/add_attendees", KoaBody(attendeeBodyArg), addAttendees)
  .get('/attendee=:attendee_id', getAttendee)
  .put('/scan=:attendee_id', scanAttendee)
  // EMAIL
  .post("/email", sendEventEmails)

module.exports = router;
