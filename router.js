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
  addOrganizer,
  getOrganizer,
} = require("./controllers");

router
  .get("", (ctx) => (ctx.body = "home route"))
  // ATTENDEES
  .get("/attendees/:event_id", getAttendees)
  .post("/attendees/:event_id", addAttendees)
  // EVENTS
  .post("/events/:organizer_id", addEvent)
  .get("/event/:event_id", getEvent)
  // ORGANIZERS
  .get("/organizer/:organizer_id", getOrganizer)
  .post("/organizer", addOrganizer);

module.exports = router;
