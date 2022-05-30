const Attendees = require('../models/attendees.models');
const Events = require('../models/events.models');
const Organizers = require('../models/organizers.models');
const { emailObjectFormatter, postEmail } = require('../helpers/email.helper');

const sendEventEmails = async ctx => {

    const { input_organizer, input_event } = ctx.request.body

    try {
        // check if event exists
        const eventCheck = await Events.findOne({ _id: input_event });

        // // if event does not exist return this
        if (eventCheck === null) {
            ctx.body = {
                result: "Event does not exist"
            };
            ctx.status = 404;
        } else {
            // check if organizer exists
            const organizerCheck = await Organizers.exists({ _id: input_organizer });

            // if organizer does not exists
            if (organizerCheck === null) {
                ctx.status = 404
                ctx.body = {
                    result: "Unauthorized Access"
                };
            } else {
                // correct event
                const event = await Events.findOne({ _id: input_event })
                // attendees for event
                const attendees = await Attendees.find({ event_id: input_event })
                // return an array of objects for email template
                const res = emailObjectFormatter(event, attendees)

                // Email for each 
                res.forEach((obj) => postEmail(obj))
                ctx.status = 200
                ctx.body = {
                    result: "Emails sent!",
                    attendees: res
                }
            }
        }
    }
    catch (err) {
        console.log(err)
        throw err
    }
}

module.exports = sendEventEmails