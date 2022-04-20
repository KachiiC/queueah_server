const Attendees = require("../models/attendees.models");

const addAttendees = async (ctx) => {
  try {
    ctx.body = "added attendees";
    ctx.status = 200;
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
