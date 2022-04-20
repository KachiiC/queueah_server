const Events = require("../models/events.models");

const addEvent = async (ctx) => {
  try {
    // Takes request and creates data in the collection
    const res = await ctx.request.body;
    await Events.create(res);
    // finds the data we just created and returns it as the body of request
    const db_data = await Events.findOne({ ...ctx.request.body });
    ctx.body = db_data;
    ctx.status = 201;
  } catch (err) {
    ctx.status = 500;
    throw err;
  }
};

const getEvents = async (ctx) => {
  try {
    const res = await Events.find();
    ctx.body = res;
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
