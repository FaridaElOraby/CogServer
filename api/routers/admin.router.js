const express = require("express");
const router = express.Router();
const {
  getValidData,
  getInvalidData,
  getLogs,
  getPaperData,
} = require("../controllers/admin.controller.js");
router.post("/getValidData", getValidData);
router.post("/getInvalidData", getInvalidData);
router.post("/getLogs", getLogs);
router.post("/getPaperData", getPaperData);
module.exports = router;
