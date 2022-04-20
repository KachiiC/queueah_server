const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const emailType = {
  type: String,
  trim: true,
  lowercase: true,
  unique: true,
  required: "Email address is required",
  validate: [validateEmail, "Please fill a valid email address"],
  match: [
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    "Please fill a valid email address",
  ],
};

module.exports = emailType;
