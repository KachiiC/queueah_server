const Events = require("../models/events.models");
const Organizers = require("../models/organizers.models");

const organizerFinder = async (ctx) => {

  // take body from request
  const req_body = ctx.request.body;
  // takes organizer_id from the params
  const { email, input_organizer } = ctx.request.body;

  try {
    // check for an organizer with same email
    const checkExists = await Organizers.exists({ email: email });

    if (checkExists === null) {
      // if they don't exist create them
      await Organizers.create(req_body);

      // then return newly created organizer
      ctx.status = 201;
      ctx.body = {
        result: "Organizer was not found, but new organizer created!",
        organizer: await Organizers.findOne(req_body)
      }
    } else {

      const checkCredentials = await Organizers.exists({ email: email, _id: input_organizer });

      if (checkCredentials === null) {

        ctx.status = 404;
        ctx.body = {
          result: "Organizer and email do not match!",
          organizer: await Organizers.findOne(req_body)
        }

      } else {

        // get all events by organizer from params
        const events = await Events.find({ organizer: checkCredentials._id });

        // update organizer events accordingly
        const found = await Organizers.findOneAndUpdate(
          // find organizer by email
          { _id: checkCredentials._id },
          // update events
          { events }
        );

        // return organizer
        ctx.status = 200;
        ctx.body = {
          result: "Organizer Found!",
          organizer: found
        };
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
