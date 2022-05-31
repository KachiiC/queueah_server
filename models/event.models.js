const { event, attendee } = require('../prisma');

const createEvent = async (id, input_body) => {

    const { create } = event

    try {
        await create({
            data: {
                ...input_body,
                organizer: { connect: { id } }
            }
        });
    } catch (err) {
        console.log(err);
        throw (err);
    }
}

const findEvent = async event_id => {
    try {
        const correctEvent = await findUnique({ where: { event_id } });

        return correctEvent

    } catch (err) {
        console.log(err)
        throw (err)
    }

}

const updateEvent = async event_id => {
    try {
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
    } catch (err) {
        console.log(err)
        throw (err)
    }

}

module.exports = {
    createEvent,
    updateEvent,
    findEvent
}