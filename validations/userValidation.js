const { body, validationResult } = require("express-validator");
const pool = require("../config/db");

// Validation rules for creating a user
const createUserValidationRules = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const [rows] = await pool.query("SELECT id FROM user WHERE email = ?", [
        email,
      ]);
      if (rows.length > 0) {
        throw new Error("Email already exists");
      }
    }),
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .custom(async (username) => {
      const [rows] = await pool.query(
        "SELECT id FROM user WHERE username = ?",
        [username]
      );
      if (rows.length > 0) {
        throw new Error("Username already exists");
      }
    }),
  body("password").notEmpty().withMessage("Password is required"),
];

// Middleware to validate and format errors
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Use a map to collect only one error per key
    const errorMap = new Map();

    errors.array().forEach((error) => {
      if (!errorMap.has(error.path)) {
        errorMap.set(error.path, {
          key: error.path,
          message: error.msg,
        });
      }
    });

    return res.status(400).json({
      errors: Array.from(errorMap.values()),
    });
  }

  next();
};

module.exports = {
  createUserValidationRules,
  validate,
};
