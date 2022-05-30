const { organizer, event } = require('../prisma');
const { updateEvent } = require('../models/event.models');

const addEvent = async ctx => {

  // input body
  const { input_body, id } = ctx.request.body;
  const { event_id } = input_body
  const { findUnique, create } = event

  try {
    // check if user exists by checking the id
    const checkOrganizer = await organizer.findUnique({ where: { id } });

    if (!checkOrganizer) {
      // if they do not exist return this statement to body
      ctx.status = 404;
      ctx.body = {
        result: "Organizer does not exist!",
        event: null
      };
    }

    // check if event exists by id
    const checkEvent = await findUnique({ where: { event_id } });

    if (checkEvent) {
      ctx.status = 404;
      ctx.body = {
        result: "Event already exists",
        event: checkEvent
      };
    }

    // create the event
    await create({
      data: {
        ...input_body,
        organizer: { connect: { id } }
      }
    });

    // // finds the data we just created and returns it as the body of response
    ctx.status = 201
    ctx.body = {
      result: "Event added!",
      event: await findUnique({ where: { event_id } })
    };

  } catch (err) {
    ctx.status = 500;
    throw err;
  }
};

const getEvent = async ctx => {

  // event_id passed through url
  const { input_event, input_organizer } = ctx.params
  const { findUnique } = event

  try {
    // check if id is same as input event_id
    const findEvent = await findUnique({ where: { event_id: Number(input_event) } });

    // if event does not exist return this
    if (!findEvent) {
      ctx.status = 404;
      ctx.body = {
        result: "Event does not exist",
        event: null
      };
    }

    if (findEvent.organizer_id !== input_organizer) {
      // if event and organizer do not match return this
      ctx.status = 403;
      ctx.body = {
        result: "Unauthorized access",
        event: null
      };
    };

    await updateEvent(Number(input_event));

    const updatedEvent = await findUnique({
      where: { event_id: Number(input_event) },
      include: { attendee: true }
    });

    ctx.status = 200;
    ctx.body = {
      result: "Event found!",
      event: updatedEvent
    };

  } catch (err) {
    ctx.status = 500;
    throw err;
  }
};

module.exports = {
  addEvent,
  getEvent
};
