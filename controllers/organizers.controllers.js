const Organizers = require("../models/organizers.models");

const addOrganizer = async (ctx) => {
  try {
    // take the request body
    const res = await ctx.request.body;
    // create data on the Organizers collection
    await Organizers.create(res);
    // finds the data we just created and returns it as the body of request
    const db_data = await Organizers.findOne({ ...ctx.request.body });
    ctx.body = db_data;
    ctx.status = 201;
  } catch (err) {
    ctx.status = 500;
    throw err;
  }
};

const getOrganizer = async (ctx) => {
  try {
    const res = await Organizers.find();
    ctx.body = res;
    ctx.status = 200;
  } catch (err) {
    ctx.status = 500;
    throw err;
  }
};

module.exports = {
  addOrganizer,
  getOrganizer,
};
