// ROUTER
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
  // addOrganizer,
  organizerFinder,
} = require("./controllers");

router
  .get("", (ctx) => (ctx.body = "home route"))
  // ATTENDEES
  .get("/attendees_list/:organizer_id/:event_id", getAttendees)
  .post("/add_attendees/:organizer_id/:event_id", addAttendees)
  // EVENTS
  .post("/add_event/:organizer_id", addEvent)
  .get("/event/:organizer_id/:event_id", getEvent)
  // ORGANIZERS
  .get("/organizer/:organizer_email", organizerFinder)

module.exports = router;
