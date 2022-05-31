const findOrCreateOrganizer = require('../models/organizer.models')

const organizerFinder = async ctx => {

  try {
    const { name, id } = ctx.request.body

    const correctOrganizer = await findOrCreateOrganizer(id, name)

    ctx.body = correctOrganizer
    ctx.status = 200

  } catch (err) {
    console.log(err)
    ctx.status = 500;
    throw err;
  }
};

module.exports = organizerFinder
