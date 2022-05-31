const node_fetch = require('node-fetch');
const { SERVICE_ID, TEMPLATE_ID, USER_ID } = process.env

const qrCodeMaker = attendee_id => {

    const herouUrl = `https%3A%2F%2Fqueueah.herokuapp.com%2Fscan%3D${attendee_id}`

    return `https://chart.googleapis.com/chart?cht=qr&chl=${herouUrl}&chs=500x500&choe=UTF-8&chld=L|2`
}

const emailParams = data => {

    return {
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: USER_ID,
        template_params: data
    }
}

const emailArgs = data => {

    return {
        method: 'POST',
        body: JSON.stringify(emailParams(data)),
        headers: { 'Content-Type': 'application/json' }
    }
}

// Formats email to send off 
const emailObjectFormatter = event_data => {

    const {
        event_name,
        venue_name,
        address,
        website,
        description,
        start_date,
        end_date,
        adults_only
    } = event_data

    return event_data.attendee.map(attendee => {

        const { attendee_id, first_name, surname, email, event_id } = attendee

        return {
            // EVENT INFO
            event_name,
            venue_name,
            address,
            website,
            description,
            start_date,
            end_date,
            adults_only,
            // ATTENDEE INFO
            attendee_name: `${first_name} ${surname}`,
            qr_code: qrCodeMaker(attendee_id),
            ticket_id: attendee_id,
            event: event_id,
            recipient: email
        }
    })
}

// Sends email to client. 
const postEmail = data => {
    node_fetch('https://api.emailjs.com/api/v1.0/email/send', emailArgs(data))
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

module.exports = {
    emailObjectFormatter,
    postEmail
}