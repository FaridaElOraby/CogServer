const express = require("express");
const router = express.Router();
const {
  logIn,
  addUser,
  validateUser,
} = require("../controllers/user.controller");
const {
  valdiateLogIn,
  validateAddUser,
  validateValidateUser,
} = require("../middleware/validations/user.validations");

router.post("/logIn", valdiateLogIn, logIn);
router.post("/addUser", validateAddUser, addUser);
router.post("/validateUser", validateValidateUser, validateUser);
module.exports = router;
