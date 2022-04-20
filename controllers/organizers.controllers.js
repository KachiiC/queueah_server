const Organizers = require("../models/organizers.models");

const addOrganizer = async (ctx) => {
  const { body, request, status } = ctx;
  try {
    // Takes request and creates data in the collection
    const res = await request.body;
    await Events.create(res);
    // finds the data we just created and returns it as the body of request
    const db_data = await Organizers.findOne({ ...request.body });
    status = 201;
  } catch (err) {
    status = 500;
    throw err;
  }
};

const getOrganizer = async (ctx) => {
  const { body, status } = ctx;
  try {
    const res = await Organizers.find();
    body = res;
    status = 200;
  } catch (err) {
    status = 500;
    throw err;
  }
};

module.exports = {
  addOrganizer,
  getOrganizer,
};
