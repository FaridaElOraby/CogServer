const jwt = require("jsonwebtoken");
const {
  breach,
  authentication,
  entityNotFound,
} = require("../constants/statusCodes");
const { signingKey } = require("../../config/keys");
const usermodel = require("../../models/user.model");
const e = require("express");

const verifyToken = (req, res, next) => {
  return jwt.verify(
    req.headers.authorization,
    signingKey,
    async (err, authorizedData) => {
      if (!err) {
        const userFound = await usermodel.findById(authorizedData.id);

        const header = req.headers.authorization;
        const token = header;
        req.data = authorizedData;
        req.token = token;

        if (!userFound) {
          return res.json({
            statusCode: entityNotFound,
            error: "Username does not exist",
          });
        }
        if (userFound.username !== req.data.username) {
          return res.json({ statusCode: breach, error: "breach username" });
        }
        return next();
      }
      return res.json({ statusCode: breach, error: err });
    }
  );
};

module.exports = {
  verifyToken,
};
