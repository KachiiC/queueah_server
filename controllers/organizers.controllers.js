const Events = require("../models/events.models");
const Organizers = require("../models/organizers.models");

const organizerFinder = async (ctx) => {
  // take body from request
  const req_body = ctx.request.body;
  // takes organizer_id from the params
  const params_email = ctx.params.organizer_email;

  try {
    // Checks params and body have same email
    if (params_email !== req_body.email) {
      ctx.body = "email from body and params do not match";
      ctx.status = 500;
    } else {
      // check for an organizer with same email
      const check = await Organizers.exists({ email: params_email });

      if (check === null) {
        // if they don't exist create them
        await Organizers.create(req_body);
        // then return newly created organizer
        ctx.body = await Organizers.findOne(req_body);
        ctx.status = 201;
      } else {
        // get all events by organizer from params
        const events = await Events.find({ organizer: check._id });
        // update organizer events accordingly
        const res = await Organizers.findOneAndUpdate(
          // find organizer by email
          { _id: check._id },
          // update events
          { events }
        );
        // return organizer
        ctx.body = res;
        ctx.status = 200;
      }
    }
  } catch (err) {
    ctx.status = 500;
    throw err;
  }
};

module.exports = {
  organizerFinder,
};
