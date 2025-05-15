const validator = require("validator");

const validationSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not correct, try again...!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password..!");
  }
};

const ValidationForProfileEdit = (req) => {
  const allowedFields =  [ "firstName", "lastName", "emailId", "age", "gender", "about", "skills" ]
  const isAllowedUpdate = Object.keys(req.body).every((field) =>
    allowedFields.includes(field)
  );
  return isAllowedUpdate;
};

module.exports = { validationSignupData, ValidationForProfileEdit };
