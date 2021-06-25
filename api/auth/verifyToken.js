const jwt = require("jsonwebtoken");
const {
  breach,
  authentication,
  entityNotFound,
} = require("../constants/statusCodes");
const { signingKey } = require("../../config/keys");
const staffmodel = require("../../models/staff.model");
const e = require("express");

const verifyToken = (req, res, next) => {
  return jwt.verify(
    req.headers.authorization,
    signingKey,
    async (err, authorizedData) => {
      if (!err) {
        const header = req.headers.authorization;
        const token = header;

        req.data = authorizedData;
        req.token = token;
        return next();
      }
      return res.json({ statusCode: breach, error: "breach" });
    }
  );
};

module.exports = {
  verifyToken,
};
