const { organizer, event } = require('../prisma')
const { updateEvent } = require('./event.models')

const findOrCreateOrganizer = async (id, name) => {

    const { findUnique, create } = organizer

    const evtArg = {
        where: { id },
        include: { events: true }
    }

    try {
        const organizerFinder = await findUnique(evtArg)

        if (!organizerFinder) {
            await create({ data: { id, name } })

            return await findUnique(evtArg)
        }

        const organizerEvents = await event.findMany({ where: { organizer_id: id } })

        organizerEvents.forEach(async (evt) => await updateEvent(evt.event_id))

        return await findUnique(evtArg)

    } catch (err) {
        console.log(err)
        throw (err)
    }
}

module.exports = findOrCreateOrganizer
