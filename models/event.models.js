const { event, attendee } = require('../prisma');

const updateEvent = async (event_id) => {

    const attendeesFinder = await attendee.findMany({
        where: { event_id },
    })

    await event.update({
        where: { event_id },
        data: {
            admitted: attendeesFinder.filter(obj => obj.scanned).length,
            not_admitted: attendeesFinder.filter(obj => !obj.scanned).length,
            attendees: attendeesFinder.length
        }
    })

    // return results
}

module.exports = {
    updateEvent
}