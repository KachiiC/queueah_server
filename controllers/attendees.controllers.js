const Attendees = require("../models/attendees.models");

const addAttendees = async (ctx) => {
  const { body, request, status } = ctx;
  try {
    const res = await request.body;
    await Attendees.create(res);
    body = res;
    status = 201;
  } catch (err) {
    status = 500;
    throw err;
  }
};

const getAttendees = async (ctx) => {
  const { body, status } = ctx;
  try {
    const res = await Attendees.find();
    body = res;
    status = 200;
  } catch (err) {
    status = 500;
    throw err;
  }
};

module.exports = {
  addAttendees,
  getAttendees,
};
