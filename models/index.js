const mongoose = require("mongoose");

const settings = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGODB_URI, settings);

module.exports = mongoose;