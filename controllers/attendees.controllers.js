const Attendees = require("../models/attendees.models");
const Events = require("../models/events.models");

const addAttendees = async (ctx) => {
  // take the request body
  const res = ctx.request.body;
  // arguement to check if _id matches event_id passed in url
  const evt_params = { _id: ctx.params.event_id };
  try {
    // check if event exists
    const check = await Events.exists(evt_params);
    if (check === null) {
      // if event does not exist return this
      ctx.body = "event does not exist";
      ctx.status = 404;
    } else {
      // if event exists, find correct event by id
      const event = await Events.findOne(evt_params);
      if (event.organizer === ctx.params.organizer_id) {
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

        // count attendees for event
        const new_total = await Attendees.countDocuments({
          event_id: ctx.params.event_id,
        });

        // update event
        await Events.findOneAndUpdate(evt_params, { attendees: new_total });

        // if array return array, if not return object
        const returnLogic = Array.isArray(res)
          ? await Attendees.find({ res })
          : await Attendees.findOne(res);

        ctx.body = returnLogic;
        ctx.status = 201;
      } else {
        ctx.body === "unauthorized access";
        ctx.status = 403;
      }
    }
  } catch (err) {
    ctx.status = 405;
    throw err;
  }
};

const getAttendees = async (ctx) => {
  // id from params
  const req_id = ctx.params.event_id;
  const evt_params = { _id: req_id };

  try {
    // check if event exists
    const check = await Events.exists(evt_params);

    if (check == null) {
      // if event does not exist return this
      ctx.body = "event does not exist";
      ctx.status = 404;
    } else {
      const event = await Events.findOne(evt_params);
      if (event.organizer === ctx.params.organizer_id) {
        // gets attendees based on event_id passed in url
        const res = await Attendees.find({ event_id: ctx.params.event_id });
        ctx.body = res;
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

const scanAttendees = async (ctx) => {
  // param arguments
  const { attendee_id, event_id, organizer_id } = ctx.params;
  const evt_params = { _id: event_id };
  try {
    // check if event exists
    const check = await Events.exists(evt_params);

    if (check == null) {
      // if event does not exist return this
      ctx.body = "event does not exist";
      ctx.status = 404;
    } else {
      const event = await Events.findOne(evt_params);
      if (event.organizer === organizer_id) {
        // gets attendees based on event_id passed in url
        const res = await Attendees.findOneAndUpdate({
          _id: attendee_id,
          event_id: event_id,
        }, {
          scanned: true
        });

        ctx.body = res;
        ctx.status = 200;
      } else {
        ctx.body = "unauthorized access";
        ctx.status = 403;
      }
    }
  } catch (err) {
    console.log(err);
    ctx.status = 404;
    throw err;
  }
};

module.exports = {
  addAttendees,
  getAttendees,
  scanAttendees,
};
