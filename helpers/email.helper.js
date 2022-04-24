const node_fetch = require('node-fetch');

const qrCodeMaker = ({ organizer_id, event_id, attendee }) => {

    const herouUrl = `https%3A%2F%2Fqueueah.herokuapp.com%2Fscan%2F${organizer_id}%2F${event_id}%2F${attendee}&chs=300x300&choe=UTF-8&chld=L|2`
    const googleApiUrl = `https://chart.googleapis.com/chart?cht=qr&chl=${herouUrl}&chs=180x180&choe=UTF-8&chld=L|2`

    return googleApiUrl
}

const emailParams = (data) => {
    const {
        date,
        event_name,
        attendee_name,
        ticket_id,
        qr_code,
        event,
        recipient,
    } = data
    return {
        service_id: process.env.SERVICE_ID,
        template_id: process.env.TEMPLATE_ID,
        user_id: process.env.USER_ID,
        template_params: {
            date,
            event_name,
            attendee_name,
            ticket_id,
            qr_code,
            event,
            recipient,
        }
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

const postEmail = (data) => {
    node_fetch('https://api.emailjs.com/api/v1.0/email/send',
        emailArgs(data))
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
}

module.exports = {
    emailArgs,
    emailParams,
    postEmail,
    qrCodeMaker
}