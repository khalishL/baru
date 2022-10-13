const bcrypt = require("bcryptjs");

function hashPassword(password) {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  return hash;
}

function passwordIsTrue(entryPassword, userPassword) {
  return bcrypt.compareSync(entryPassword, userPassword);
}

module.exports = { hashPassword, passwordIsTrue };
