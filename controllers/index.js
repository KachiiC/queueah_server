const { addAttendees, getAttendees } = require("./attendees.controllers");
const { getEvents, addEvent } = require("./events.controllers");
const { getOrganizer, addOrganizer } = require("./organizers.controllers");

module.exports = {
    addAttendees, 
    getAttendees,
    getEvents, 
    addEvent,
    getOrganizer, 
    addOrganizer
}