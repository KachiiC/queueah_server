const node_fetch = require('node-fetch');

const qrCodeMaker = ({ organizer_id, event_id, attendee }) => {

    const herouUrl = `https%3A%2F%2Fqueueah.herokuapp.com%2Fscan%2F${organizer_id}%2F${event_id}%2F${attendee}&chs=300x300&choe=UTF-8&chld=L|2`
    const googleApiUrl = `https://chart.googleapis.com/chart?cht=qr&chl=${herouUrl}&chs=180x180&choe=UTF-8&chld=L|2`

    return googleApiUrl
}

const emailParams = (data) => {

    const { SERVICE_ID, TEMPLATE_ID, USER_ID } = process.env

    return {
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: USER_ID,
        template_params: data
    }
}

const emailArgs = (data) => {

    return {
        method: 'POST',
        body: JSON.stringify(emailParams(data)),
        headers: {
            'Content-Type': 'application/json'
        }
    }
}

// Formats email to send off 
const emailObjectFormatter = (event_data, attendee_data) => {

    const { start_date, end_date, event_name, organizer } = event_data

    return attendee_data.map(attendee => {

        const qr_data = {
            organizer_id: organizer,
            event_id: attendee.event_id,
            attendee: attendee._id
        }

        return {
            start_date,
            end_date,
            event_name,
            attendee_name: `${attendee.first_name} ${attendee.surname}`,
            ticket_id: attendee._id,
            qr_code: qrCodeMaker(qr_data),
            event: attendee.event_id,
            recipient: attendee.email
        }
    })
}

// Sends email to client. 
const postEmail = (data) => {
    node_fetch('https://api.emailjs.com/api/v1.0/email/send',
        emailArgs(data))
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

module.exports = {
    qrCodeMaker,
    emailParams,
    emailArgs,
    emailObjectFormatter,
    postEmail
}