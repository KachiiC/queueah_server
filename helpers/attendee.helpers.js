const genderTypes = {
  type: String,
  enum: ["male", "female"],
};

const scannedTypes = {
  type: Boolean,
  default: false,
};

module.exports = {
    genderTypes,
    scannedTypes
}