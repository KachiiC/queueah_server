const Events = require("../models/events.models");
const Organizers = require("../models/organizers.models");

const organizerFinder = async (ctx) => {
  // take body from request
  const req_body = ctx.request.body;
  // takes organizer_id from the params
  const req_id = ctx.params.organizer_id;

  try {
    // check for an organizer with same email
    const check = await Organizers.exists({ email: req_id });
    if (check === null) {
      // if they don't exist create them,
      await Organizers.create(req_body);
      // then return newly created organizer
      ctx.body = await Organizers.findOne(req_body);
      
      ctx.status = 201;
    } else {
      // get all events by organizer from params
      const events = await Events.find({ organizer: req_id });
      // update organizer events accordingly
      const res = await Organizers.findOneAndUpdate(
        // find organizer by email
        { email: req_id },
        // update events
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
  organizerFinder,
};
