const usermodel = require("../../models/user.model");

const jwt = require("jsonwebtoken");
const fs = require("fs");

const { signingKey, salt } = require("../../config/keys");

const bcrypt = require("bcryptjs");
const { gender } = require("../constants/enums");
const {
  usershouldbeunique,
  entityNotFound,
  wrongCredentials,
} = require("../constants/statusCodes");

const addUser = async (req, res) => {
  try {
    const user = req.body;
    const userFound = await usermodel.findOne({ username: user.username });
    if (userFound) {
      return res.json({
        statusCode: usershouldbeunique,
        error: "Username should be unique",
      });
    }
    const saltKey = bcrypt.genSaltSync(salt);
    const hashed_pass = bcrypt.hashSync("123456", saltKey);
    user.password = hashed_pass;
    user.Phase = "initial testing";
    const newUser = await usermodel.create(user);

    const payLoad = {
      id: user._id,
      username: user.name,
    };

    const token = jwt.sign(payLoad, signingKey);

    return res.json({ statusCode: success, user: newUser, token: token });
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
      statusCode: unknown,
    });
  }
};

const logIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await usermodel.findOne({ username });
    if (!staff) {
      return res.json({
        error: "Username not found",
        statusCode: entityNotFound,
      });
    }
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      return res.json({
        error: "wrong credentials",
        statusCode: wrongCredentials,
      });
    }
    const payLoad = {
      id: user._id,
      username: user.name,
    };

    const token = jwt.sign(payLoad, signingKey);

    return res.json({
      statusCode: success,
      token,
      payLoad,
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
      statusCode: unknown,
    });
  }
};

module.exports = {
  addUser,
  logIn,
};
