const express = require("express");
const userController = require("../controllers/userController");
const {
  createUserValidationRules,
  validate,
} = require("../validations/userValidation");

const router = express.Router();

router.get("/getList", userController.getAllUsers);
router.post(
  "/register",
  createUserValidationRules,
  validate,
  userController.createUser
);

module.exports = router;
