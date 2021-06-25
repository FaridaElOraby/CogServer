const express = require("express");
const { verifyToken } = require("../auth/verifyToken");
const router = express.Router();
const { addRecord } = require("../controllers/log.controller");
const {
  validateAddRecord,
} = require("../middleware/validations/log.validations");

router.post("/addRecord", validateAddRecord, verifyToken, addRecord);
module.exports = router;
