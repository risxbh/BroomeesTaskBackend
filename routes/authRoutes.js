const express = require("express");
const {
  loginValidationRules,
  validate,
} = require("../validations/authValidation");
const authController = require("../controllers/authController");

const router = express.Router();

// Login route
router.post("/login", loginValidationRules, validate, authController.login);

module.exports = router;
