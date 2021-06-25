const express = require("express");
const { verifyToken } = require("../auth/verifyToken");
const router = express.Router();
const { addRecord } = require("../controllers/simpleDetection.controller");
const {
  validateAddRecord,
} = require("../middleware/validations/simpleDetection.validations");

router.post("/addRecord", validateAddRecord, verifyToken, addRecord);
module.exports = router;
