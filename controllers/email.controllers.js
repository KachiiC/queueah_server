const { event, attendee } = require('../prisma');
const { emailObjectFormatter } = require('../helpers/email.helper');

const sendEventEmails = async (ctx) => {

    const { input_organizer, input_event } = ctx.request.body

    try {
        // check if event exists
        const eventCheck = await event.findUnique({ where: { event_id: input_event } });

        // // if event does not exist return this
        if (!eventCheck) {
            ctx.status = 404;
            ctx.body = {
                result: "Event does not exist",
                attendees: null
            };
        }
        // if organizer does not exists
        if (eventCheck.organizer_id !== input_organizer) {
            ctx.status = 404
            ctx.body = {
                result: "Unauthorized Access",
                attendees: null
            }
        } else {
            // attendees for event
            const eventAttendees = await attendee.findMany({ where: { event_id: input_event } })
            
            // return an array of objects for email template
            // const res = emailObjectFormatter(event, eventAttendees)

            // Email for each 
            // res.forEach((obj) => postEmail(obj))
            ctx.status = 200
            ctx.body = {
                result: "Emails sent!",
                attendees: eventAttendees
            }
        }
    }

    catch (err) {
        console.log(err)
        throw err
    }
}

module.exports = sendEventEmails