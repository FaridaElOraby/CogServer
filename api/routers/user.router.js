const express = require("express");
const router = express.Router();
const { logIn, addUser } = require("../controllers/user.controller");
const {
  valdiateLogIn,
  validateAddUser,
} = require("../middleware/validations/user.validations");

router.post("/logIn", valdiateLogIn, logIn);
router.post("/addUser", validateAddUser, addUser);
module.exports = router;
