const Events = require('../models/events.models')

const addEvent = async (ctx) => {
  try {
    ctx.body = "add event";
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    throw err;
  }
};

const getEvents = async (ctx) => {
  try {
    const res = await Events.find()
    ctx.body = res
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    throw err;
  }
};

module.exports = {
  addEvent,
  getEvents,
};
