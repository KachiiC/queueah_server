const Router = require("koa-router");
const { getEvents, addEvent } = require("./controllers/events.controllers");

const router = new Router();

router
  .get("", (ctx) => (ctx.body = "home route"))
  //EVENTS
  .get("/events", getEvents)
  .post("/events", addEvent);

module.exports = router;
