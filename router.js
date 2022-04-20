const Router = require("koa-router");
const {
    addAttendees, 
    getAttendees,
    getEvents, 
    addEvent,
    getOrganizer, 
    addOrganizer
} = require('./controllers')

const router = new Router();

router
  .get("", (ctx) => (ctx.body = "home route"))
  // ATTENDEES
  .get("/attendees", getAttendees)
  .post("/attendees", addAttendees)
  // EVENTS
  .get("/events", getEvents)
  .post("/events", addEvent)
  // ORGANIZERS
  .get("/organizers", getOrganizer)
  .post("/organizers", addOrganizer);

module.exports = router;
