var validator = require("validator");

const { isURL, isEmail } = validator;

const urlTypes = {
  type: String,
  validate: [isURL, "Please use a valid a valid url"],
};

const emailTypes = {
  type: String,
  validate: [isEmail, "Please use a valid email address"],
};

module.exports = {
  urlTypes,
  emailTypes,
};
