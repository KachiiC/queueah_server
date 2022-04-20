const Organizers = require("../models/organizers.models");

const addOrganizer = async (ctx) => {
  try {
    const res = await ctx.request.body;
    await Organizers.create(res)
    ctx.body = res;
    ctx.status = 200;
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
