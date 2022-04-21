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
  .get("/attendees/:organizer_id/:event_id", getAttendees)
  .post("/attendees/:organizer_id/:event_id", addAttendees)
  // EVENTS
  .post("/events/:organizer_id", addEvent)
  .get("/event/:organizer_id/:event_id", getEvent)
  // ORGANIZERS
  .get("/organizer/:organizer_id", organizerFinder)
  // .post("/organizer", addOrganizer);

module.exports = router;
