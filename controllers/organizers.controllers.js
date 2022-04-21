const Events = require("../models/events.models");
const Organizers = require("../models/organizers.models");

const addOrganizer = async (ctx) => {
  // takes body of the request
  const req_body = ctx.request.body;
  try {
    // check if organizers exists by email
    const check = await Organizers.exists({ email: req_body.email });
    // if they don't exist create them, otherwise they already exist
    if (check === null) {
      await Organizers.create(req_body);
      const res = await Organizers.findOne(req_body);
      ctx.body = res;
      ctx.status = 201;
    } else {
      ctx.body = "user already exists";
      ctx.status = 409;
    }
    // return result
  } catch (err) {
    ctx.status = 500;
    throw err;
  }
};

const getOrganizer = async (ctx) => {
  // takes organizer_id from the params
  const req_id = ctx.params.organizer_id;
  try {
    // check for an organizer with same email
    const check = await Organizers.exists({ email: req_id });
    if (check === null) {
      // if user can not be found, return does not exist
      ctx.body = "user does not exist";
      // not found status code
      ctx.status = 404;
    } else {
      // get all events by organizer from params
      const events = await Events.find({ organizer: req_id });
      // update organizer events accordingly
      const res = await Organizers.findOneAndUpdate(
        { email: req_id },
        { events }
      );
      // return organizer
      ctx.body = res;
      ctx.status = 200;
    }
  } catch (err) {
    ctx.status = 500;
    throw err;
  }
};

module.exports = {
  addOrganizer,
  getOrganizer,
};
