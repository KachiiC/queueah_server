const { event } = require('../prisma');
const { emailObjectFormatter, postEmail } = require('../helpers/email.helper');

const sendEventEmails = async ctx => {

    const { input_organizer, input_event } = ctx.request.body

    try {
        // check if event exists
        const eventCheck = await event.findUnique({
            where: { event_id: input_event },
            include: { attendee: true }
        });

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
            // return an array of objects for email template
            const emailData = emailObjectFormatter(eventCheck)

            // Email for each 
            emailData.forEach(obj => postEmail(obj))

            ctx.status = 200
            ctx.body = {
                result: "Emails sent!",
                attendees: eventCheck.attendee
            }
        }
    }
    catch (err) {
        console.log(err)
        ctx.status = 500
        throw err
    }
}

module.exports = sendEventEmails