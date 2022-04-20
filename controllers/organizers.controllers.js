const Events = require("../models/events.models");
const Organizers = require("../models/organizers.models");

const addOrganizer = async (ctx) => {
  // takes body of the request
  const req_body = ctx.request.body;
  try {
    // check if organizers exists by email
    const check = await Organizers.exists({ email: req_body.email });
    // check doesn't exist create them, otherwise they exist
    const res =
      check === null ? await Organizers.create(req_body) : "User exists";
    // return result
    ctx.body = res;
    ctx.status = 201;
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
      ctx.status = 400;
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
