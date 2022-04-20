const Events = require("../models/events.models");

const addEvent = async (ctx) => {
  const { body, request, status } = ctx;
  try {
    // Takes request and creates data in the collection
    const res = await request.body;
    await Events.create(res);
    // finds the data we just created and returns it as the body of request
    const db_data = await Events.findOne({ ...request.body });
    body = db_data;
    status = 201;
  } catch (err) {
    status = 500;
    throw err;
  }
};

const getEvents = async (ctx) => {
  const { body, status } = ctx;
  try {
    const res = await Events.find();
    body = res;
    status = 200;
  } catch (err) {
    status = 500;
    throw err;
  }
};

module.exports = {
  addEvent,
  getEvents,
};
