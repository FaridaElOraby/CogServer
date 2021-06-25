const express = require("express");
const { verifyToken } = require("../auth/verifyToken");
const router = express.Router();
const { addRecord } = require("../controllers/reyAuditory.controller");
const {
  validateAddRecord,
} = require("../middleware/validations/reyAuditory.validations");

router.post("/addRecord", validateAddRecord, verifyToken, addRecord);
module.exports = router;
