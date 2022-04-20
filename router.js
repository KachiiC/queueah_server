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
  // ORGANIZERS
  addOrganizer,
  getOrganizer,
} = require("./controllers");

router
  .get("", (ctx) => (ctx.body = "home route"))
  // ATTENDEES
  .get("/attendees", getAttendees)
  .post("/attendees", addAttendees)
  // EVENTS
  .post("/events", addEvent)
  // ORGANIZERS
  .get("/organizer/:id", getOrganizer)
  .post("/organizer", addOrganizer);

module.exports = router;
