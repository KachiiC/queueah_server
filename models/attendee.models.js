const { attendee } = require('../prisma');
const { csvToJs } = require('../helpers/attendee.helpers');
const { updateEvent } = require('./event.models');

const createAttendees = async (path, event_name, event_id) => {

    const results = await csvToJs(path)

    // add event name and id to each attendee
    const createData = results.map(evt => {
        return {
            ...evt,
            event_name,
            event_id
        }
    })

    // create attendees
    await attendee.createMany({ data: createData })

    await updateEvent(Number(event_id))

    return createData
}

module.exports = {
    createAttendees
}