const { body, validationResult } = require("express-validator");

const loginValidationRules = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((error) => ({
        key: error.param,
        message: error.msg,
      })),
    });
  }
  next();
};

module.exports = { loginValidationRules, validate };
