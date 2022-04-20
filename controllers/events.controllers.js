const Events = require("../models/events.models");

const addEvent = async (ctx) => {
  try {
    // take the request body
    const res = await ctx.request.body;
    // create data on the Events collection
    await Events.create(res);
    // finds the data we just created and returns it as the body of response
    const db_data = await Events.findOne({ ...res });
    ctx.body = db_data;
    ctx.status = 201;
  } catch (err) {
    ctx.status = 500;
    throw err;
  }
};

module.exports = {
  addEvent,
};
