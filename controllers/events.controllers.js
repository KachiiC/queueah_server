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
    ctx.body = "get event";
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
