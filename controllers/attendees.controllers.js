const Attendees = require("../models/attendees.models");
const Events = require("../models/events.models");
const { AttendeeMaker, csvToJs } = require("../helpers/attendee.helpers");

const addAttendees = async (ctx) => {

  // take the request body and params
  const { input_organizer, input_event } = ctx.params;

  // arguement to check if _id matches event_id passed in url
  const evt_params = { _id: input_event };

  try {
    // check if event exists
    const checkEvent = await Events.exists(evt_params);

    // if event does not exist return this
    if (checkEvent === null) {
      ctx.status = 404;
      ctx.body = {
        result: "Event does not exist",
        attendees: null
      };
    } else {
      // if event exists, find correct event by id
      const event = await Events.findOne(evt_params);

      if (input_organizer === event.organizer) {

        const evt_arg = { event_id: input_event }

        // help that create new attendees on input object that is passed
        const creator = async (input) => {
          const attendee = await Attendees.exists(input)

          if (attendee === null) {
            Attendees.create({
              ...input,
              event_name: event.event_name,
              event_id: event._id,
            });
          }
        };

        console.log(ctx.request.files.csv_file.filepath)
        const results = await csvToJs(ctx.request.files.csv_file.filepath, {})
        
        // if body is array, create for each object in body, otherwise just create on body
        AttendeeMaker(results, creator)

        // count attendees for event
        const new_total = await Attendees.countDocuments(evt_arg);

        // update event
        await Events.findOneAndUpdate(evt_params, { attendees: new_total });

        // return this body
        ctx.body = {
          result: "added new attendees!",
          attendees: await Attendees.find(evt_arg)
        }

        ctx.status = 201;

      } else {
        ctx.body = {
          result: "Unauthorized access",
          attendees: null
        };
        ctx.status = 403;
      }
    }
  } catch (err) {
    ctx.status = 405;
    ctx.body = "ERROR"
    console.log(err)
    throw err;
  }
};

const getAttendees = async (ctx) => {

  // id from request body
  const { input_event, input_organizer } = ctx.request.body

  try {
    // check if event exists
    const check = await Events.exists({ _id: input_event });

    if (check == null) {
      // if event does not exist return this
      ctx.status = 404;
      ctx.body = {
        result: "Event does not exist",
        attendees: null
      };
    } else {
      // Get correct event
      const event = await Events.findOne({ _id: input_event });
      // Check if input organizer is same as event organizer
      if (event.organizer === input_organizer) {
        // gets attendees based on event_id passed in url
        const res = await Attendees.find({ event_id: input_event });
        ctx.body = {
          result: "attendees found!",
          attendees: res
        };
        ctx.status = 200;
      } else {
        // if input organizer isn't the same as the event organizer, returns this
        ctx.body = {
          result: "Unauthorized access!",
          attendees: null
        };
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
  const { attendee_id } = ctx.params;
  const { input_organizer, input_event } = ctx.request.body
  const evt_params = { event_id: input_event, _id: attendee_id };

  try {
    // check if attendee and event exists
    const checkAttendee = await Attendees.exists(evt_params);

    if (checkAttendee == null) {
      // if attendee does not exist return this
      ctx.status = 404;
      ctx.body = {
        result: "This is an invalid qr code...",
        attendee: null
      };
    } else {

      // If attendee exists then event should also exist so get event
      const event = await Events.findOne({ _id: input_event });

      // if correct organizer then do this
      if (event.organizer === input_organizer) {
        // correct attendee
        const admission_status = await Attendees.findOne({ _id: attendee_id, scanned: false })

        if (admission_status === null) {

          // return this if attendee exists but already scanned
          ctx.status = 200;
          ctx.body = {
            result: "already scanned!",
            attendee: await Attendees.findOne({ _id: attendee_id })
          };

        } else {

          // gets attendees based on event_id passed in url
          const new_attendee = await Attendees.findOneAndUpdate({ _id: attendee_id }, {
            scanned: true,
          });

          // check number of scanned attendees
          const now_scanned = await Attendees.countDocuments({
            event_id: input_event,
            scanned: true,
          });

          // check number of non-scanned attendees
          const yet_to_scan = await Attendees.countDocuments({
            event_id: input_event,
            scanned: false,
          });

          // updates the event
          await Events.findOneAndUpdate({ _id: input_event }, {
            admitted: now_scanned,
            not_admitted: yet_to_scan,
          });

          ctx.status = 200;
          ctx.body = {
            result: "now scanned",
            attendee: await Attendees.findOne({ _id: attendee_id })
          };
        }
      } else {
        ctx.body = {
          result: "Unauthorised access",
          attendee: null
        };
        ctx.status = 404
      }
    }
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    throw err;
  }
};

const deleteAttendee = async (ctx) => {

  // Get params and body from context 
  const { input_event, input_organizer } = ctx.request.body
  const { attendee_id } = ctx.params
  const evt_params = { _id: attendee_id, event_id: input_event }

  try {
    // check if attendee exists for event
    const checkAttendee = await Attendees.exists(evt_params)

    if (checkAttendee === null) {
      // if event or attendee for event do not exist return this
      ctx.status = 404;
      ctx.body = {
        result: "Invalid request, event or attendee do not exist",
        attendee: null
      };
    } else {

      const event = await Events.findOne({ _id: input_event })

      if (event.organizer === input_organizer) {

        // find attendee
        const attendee = await Attendees.findOne(evt_params)
        // delete attendee
        await Attendees.findOneAndDelete({ _id: attendee_id })

        ctx.status = 201
        // return the attendee delete
        ctx.body = {
          result: "attendee exists! and deleted",
          deleted_attendee: attendee
        }

      } else {
        ctx.body = {
          result: "unauthorised access",
          deleteAttendee: null
        }
        ctx.status = 404
      }
    }
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    throw err;
  }
}

module.exports = {
  addAttendees,
  getAttendees,
  scanAttendees,
  deleteAttendee
};
