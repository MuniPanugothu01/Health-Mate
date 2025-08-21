const validator = require("validator");

const valideSignUpUserData = (data) => {
  const { firstName, lastName, emailId, password } = data;

  if (!firstName || !lastName) {
    throw new Error("Please fill in all fields!");
  }

  if (!emailId || !validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  }

  if (!password || !validator.isStrongPassword(password)) {
    throw new Error("Enter a stronger password!");
  }
};

module.exports = {
  valideSignUpUserData,
};
