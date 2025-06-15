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
  const allowedFields =  [ "firstName", "lastName", "emailId", "dob", "gender", "about", "skills", "linkDinUrl", "imageUrl", "gitHubUrl" ]
  const isAllowedUpdate = Object.keys(req.body).every((field) =>
    allowedFields.includes(field)
  );
  return isAllowedUpdate;
};

const validatePasswordUpdate = (req) => {
  const allowedFields = ["password"];
  const bodyKeys = Object.keys(req.body);

  // Ensure only 'password' is present
  const isOnlyPassword = bodyKeys.length === 1 && allowedFields.includes(bodyKeys[0]);
  if (!isOnlyPassword) {
    throw new Error("Only password field is allowed.");
  }

  const { password } = req.body;

  // Check strong password
  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password..!");
  }

  return true;
};

module.exports = { validationSignupData, ValidationForProfileEdit, validatePasswordUpdate };
