const Attendees = require("../models/attendees.models");
const Events = require("../models/events.models");

const addAttendees = async (ctx) => {
  // take the request body
  const res = ctx.request.body;
  // find _id that matches event id passed in url
  const params = { _id: ctx.params.event_id };
  try {
    const check = await Events.exists(params);
    if (check === null) {
      ctx.body = "event does not exist";
      ctx.status = 404;
    } else {
      // find correct event
      const event = await Events.findOne(params);

      // help that create new attendees on input object that is passed
      const creator = (input) => {
        Attendees.create({
          ...input,
          event_name: event.event_name,
          event_id: event._id,
        });
      };

      // if body is array, create for each object in body, otherwise just create on body
      Array.isArray(res) ? res.forEach((obj) => creator(obj)) : creator(res);
      // return context of body
      ctx.body = res;
      ctx.status = 201;
    }
  } catch (err) {
    ctx.status = 500;
    throw err;
  }
};

const getAttendees = async (ctx) => {
  // id from params
  const req_id = ctx.params.event_id;

  try {
    const check = await Events.exists({ _id: req_id });

    if (check == null) {
      ctx.body = "event does not exist";
      ctx.status = 404;
    } else {
      // gets attendees based on event_id passed in url
      const res = await Attendees.find({ event_id: ctx.params.event_id });
      ctx.body = res;
      ctx.status = 200;
    }
  } catch (err) {
    ctx.status = 500;
    throw err;
  }
};

module.exports = {
  addAttendees,
  getAttendees,
};
