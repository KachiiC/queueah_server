const Attendees = require("../models/attendees.models");
const Events = require("../models/events.models");
const Organizers = require("../models/organizers.models");

const addEvent = async (ctx) => {
  // id from params
  const req_id = ctx.params.organizer_id;
  // input body
  const input_body = ctx.request.body;
  try {
    const check = await Organizers.exists({ email: req_id });
    if (check === null) {
      ctx.body = "user does not exist";
      ctx.status = 404;
    } else {
      await Events.create(input_body);
      ctx.body = await Events.findOne(input_body);
      ctx.status = 201;
    }
    // // finds the data we just created and returns it as the body of response
  } catch (err) {
    ctx.status = 500;
    throw err;
  }
};

const getEvent = async (ctx) => {
  // event_id passed through url
  const input_id = ctx.params.event_id;
  // check if id is same as input event_id
  const _idArg = { _id: input_id };
  try {
    const check = await Events.exists(_idArg);

    if (check === null) {
      ctx.body = "user does not exist";
      ctx.status = 404;
    } else {
      // count total number of attendees for event
      const total = await Attendees.countDocuments({ event_id: input_id });
      // update event attendees number
      await Events.findOneAndUpdate(_idArg, { attendees: total });
      // return the event
      ctx.body = await Events.findOne(_idArg);
      ctx.status = 200;
    }
  } catch (err) {
    ctx.status = 500;
    throw err;
  }
};

module.exports = {
  addEvent,
  getEvent,
};
