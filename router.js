const Router = require("koa-router");
const { addAttendees, getAttendees } = require("./controllers/attendees.controllers");
const { getEvents, addEvent } = require("./controllers/events.controllers");

const router = new Router();

router
  .get("", (ctx) => (ctx.body = "home route"))
  // ATTENDEES
  .get("/attendees", getAttendees)
  .post("/attendees", addAttendees)
  // EVENTS
  .get("/events", getEvents)
  .post("/events", addEvent);

module.exports = router;
