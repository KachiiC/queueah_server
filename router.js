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

const bodyArg = { 
  multipart: true, 
  uploadDir: '.' 
}

router
  .get("", ctx => ctx.body = "Home route")
  // ATTENDEES
  .get("/attendees_list/", getAttendees)
  .post("/add_attendees/:input_organizer/:input_event", KoaBody(bodyArg), addAttendees)
  .delete("/delete_attendee/:attendee_id", deleteAttendee)
  .put("/scan/:attendee_id", scanAttendees)
  // EVENTS
  .post("/add_event", addEvent)
  .get("/event", getEvent)
  // ORGANIZERS
  .put("/organizer", organizerFinder)
  // EMAIL
  .get("/email", sendEventEmails)

module.exports = router;
