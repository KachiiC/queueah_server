const Attendees = require("../models/attendees.models");
const Events = require("../models/events.models");
const Organizers = require("../models/organizers.models");

const addEvent = async (ctx) => {

  // input body
  const { input_body, input_organizer } = ctx.request.body;
  try {
    // check if user exists by checking the email passed
    const check = await Organizers.exists({ _id: input_organizer });
    if (check === null) {
      // if they do not exist return this statement to body
      ctx.body = {
        result: "Organizer does not exist!",
        event: null
      };
      ctx.status = 404;
    } else {

      const checkEvent = await Events.exists(input_body);

      if (checkEvent === null) {
        // if event do not exist the event based on the input body
        const eventBody = {
          ...input_body,
          organizer: input_organizer,
          admitted: 0,
          not_admitted: 0
        }

        await Events.create(eventBody);
        // // finds the data we just created and returns it as the body of response
        ctx.status = 201;
        ctx.body = {
          result: "Event added!",
          event: await Events.findOne(input_body)
        }
      } else {
        // if event does not exist return this
        ctx.status = 404;
        ctx.body = {
          result: "Event already exists",
          event: await Events.findOne(input_body)
        };
      }
    }
  } catch (err) {
    ctx.status = 500;
    throw err;
  }
};

const getEvent = async (ctx) => {

  // event_id passed through url
  const { input_organizer, input_event } = ctx.request.body
  // event args
  const eventArgs = {
    _id: input_event
  }

  try {
    // check if id is same as input event_id
    const check = await Events.exists(eventArgs);

    if (check === null) {
      // if event does not exist return this
      ctx.status = 404;
      ctx.body = {
        result: "event does not exist",
        event: null
      };
    } else {

      // Correct event
      const event = await Events.findOne(eventArgs);

      if (event.organizer === input_organizer) {

        // count total number of attendees for this event
        const total = await Attendees.countDocuments({ event_id: input_event });

        const scanned = await Attendees.countDocuments({
          event_id: input_event,
          scanned: true,
        });

        const yet_to_scan = await Attendees.countDocuments({
          event_id: input_event,
          scanned: false,
        });

        // Updated Event scanned list 
        const updateArgs = {
          attendees: total,
          not_admitted: yet_to_scan,
          admitted: scanned
        }

        // update number of attendees for this event
        await Events.findOneAndUpdate(eventArgs, updateArgs);

        // return the event
        ctx.status = 200;
        ctx.body = {
          result: "Event found!",
          event: await Events.findOne(eventArgs)
        };
      } else {
        ctx.status = 403;
        ctx.body = {
          result: "Unauthorized access",
          event: null
        };
      }
    }
  } catch (err) {
    ctx.status = 500;
    throw err;
  }
};

const getOrganizerEvents = async (ctx) => {

  try {

    const checkOrganizer = await Organizers.exists({ _id: ctx.params.organizer_id })

    if (checkOrganizer === null) {
      // if event does not exist return this
      ctx.status = 404;
      ctx.body = {
        result: "organizer does not exist",
        events: null
      };
    } else {

      // return the event
      ctx.status = 200;
      ctx.body = {
        result: "Organizer found!",
        events: await Events.find({ organizer: ctx.params.organizer_id })
      }
    }
  } catch (err) {
    ctx.status = 500;
    throw err;
  }
};

const deleteEvent = async (ctx) => {

}

module.exports = {
  addEvent,
  getEvent,
  deleteEvent,
  getOrganizerEvents
};
