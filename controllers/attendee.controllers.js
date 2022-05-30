const { attendee, event } = require('../prisma');
const { createAttendees } = require('../models/attendee.models');

const addAttendees = async ctx => {

  // take the request body and params
  const { input_organizer, input_event } = ctx.params;

  const { findUnique } = event

  const evt_arg = { event_id: Number(input_event) }

  try {
    const findEvent = await findUnique({ where: evt_arg });

    // check if event exists
    if (!findEvent) {
      // if event does not exist return this
      ctx.status = 404;
      ctx.body = {
        result: "Event does not exist",
        new_attendees: null
      };
    }

    const { organizer_id, event_name, event_id } = findEvent

    // check if input_organizer and organizer match
    if (organizer_id !== input_organizer) {
      ctx.status = 403;
      ctx.body = {
        result: "Unauthorized access",
        new_attendees: null
      };
    }
    
    // turn csv file uploaded into js data
    const results = await createAttendees(
      ctx.request.files.csv_file.filepath,
      event_name,
      event_id
    )

    const updatedEvent = await findUnique({ where: evt_arg })

    // return this body
    ctx.status = 201;
    ctx.body = {
      result: "Added new attendees!",
      total_attendees: updatedEvent.attendees,
      new_attendees: results
    };

  } catch (err) {
    console.log(err);
    ctx.status = 500;
    throw err;
  }
};

const getAttendee = async ctx => {

  const { attendee_id } = ctx.params;

  try {
    // check if attendee and event exists
    const findAttendee = await attendee.findUnique({ where: { attendee_id } });

    if (!findAttendee) {
      ctx.status = 404;
      // if attendee does not exist return this
      ctx.body = {
        result: "Invalid QR code.",
        attendee: null
      };
    } else {
      // return based on scan status
      const resultLogic = !findAttendee.scanned ? "Ready to scanned!" : "Already scanned!"
      ctx.status = 200;
      ctx.body = {
        result: resultLogic,
        attendee: findAttendee
      };
    }
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    throw err;
  }
}

const scanAttendee = async ctx => {

  const { attendee_id } = ctx.params;

  try {
    // check if attendee and event exists
    const attendeeFinder = await attendee.findUnique({ where: { attendee_id } });

    if (!attendeeFinder) {
      // if attendee does not exist return this
      ctx.status = 404;
      ctx.body = {
        result: "Invalid QR code.",
        attendee: null
      };
    }

    if (attendeeFinder.scanned) {
      // return this if attendee exists but already scanned
      ctx.body = {
        result: "QR code already scanned!",
        attendee: await attendee.findUnique({ where: { attendee_id } })
      };
    }

    await attendee.update({
      where: { attendee_id },
      data: { scanned: true }
    })

    ctx.body = {
      result: "QR code now scanned!",
      attendee: await attendee.findUnique({ where: { attendee_id } })
    };

    ctx.status = 200;

  } catch (err) {
    console.log(err);
    ctx.status = 500;
    throw err;
  }
};

module.exports = {
  addAttendees,
  scanAttendee,
  getAttendee
};
