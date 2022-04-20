const Attendees = require("../models/attendees.models");

const addAttendees = async (ctx) => {
  try {
    // take the request body
    const res = await ctx.request.body;
    // create data on the Attendees collection
    await Attendees.create(res);
    // finds the data we just created and returns it as the body of response
    const new_attendees = await Attendees.find({...res})
    ctx.body = new_attendees;
    ctx.status = 201;
  } catch (err) {
    ctx.status = 500;
    throw err;
  }
};

const getAttendees = async (ctx) => {
  try {
    const res = await Attendees.find();
    ctx.body = res;
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    throw err;
  }
};

module.exports = {
  addAttendees,
  getAttendees,
};
