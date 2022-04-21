const Attendees = require("../models/attendees.models");
const Events = require("../models/events.models");
const Organizers = require("../models/organizers.models");

const addEvent = async (ctx) => {
  // id from params
  const req_id = ctx.params.organizer_id;
  // input body
  const input_body = ctx.request.body;
  try {
    // check if user exists by checking the email passed
    const check = await Organizers.exists({ email: req_id });
    if (check === null) {
      // if they do not exist return this statement to body
      ctx.body = "user does not exist";
      ctx.status = 404;
    } else {
      // if they do exist create the event based on the input body
      await Events.create(input_body);
      // // finds the data we just created and returns it as the body of response
      ctx.body = await Events.findOne(input_body);
      ctx.status = 201;
    }
  } catch (err) {
    ctx.status = 500;
    throw err;
  }
};

const getEvent = async (ctx) => {
  // event_id passed through url
  const input_id = ctx.params.event_id;
  // arg that will be used to check if id is same as input event_id
  const _idArg = { _id: input_id };
  try {
    // check if id is same as input event_id
    const check = await Events.exists(_idArg);
    if (check === null) {
      // if event does not exist return this
      ctx.body = "event does not exist";
      ctx.status = 404;
    } else {
      const event = await Events.findOne({ _id: ctx.params.event_id });

      if (event.organizer === ctx.params.organizer_id) {
        // count total number of attendees for this event
        const total = await Attendees.countDocuments({ event_id: input_id });
        // update number of attendees for this event
        await Events.findOneAndUpdate(_idArg, { attendees: total });
        // return the event
        ctx.body = await Events.findOne(_idArg);
        ctx.status = 200;
      } else {
        ctx.body = "unauthorized access";
        ctx.status = 403;
      }
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
