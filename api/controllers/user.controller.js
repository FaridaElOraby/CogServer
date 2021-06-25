const usermodel = require("../../models/user.model");

const jwt = require("jsonwebtoken");
const fs = require("fs");

const { signingKey, salt } = require("../../config/keys");

const bcrypt = require("bcryptjs");
const { gender } = require("../constants/enums");
const {
  success,
  usershouldbeunique,
  entityNotFound,
  wrongCredentials,
} = require("../constants/statusCodes");

const addUser = async (req, res) => {
  try {
    const user = req.body;
    const username = user.username.toLowerCase();
    user.username = username;
    const userFound = await usermodel.findOne({ username: username });
    if (userFound) {
      return res.json({
        statusCode: usershouldbeunique,
        error: "Username should be unique",
      });
    }
    const saltKey = bcrypt.genSaltSync(salt);
    const hashed_pass = bcrypt.hashSync(user.password, saltKey);
    user.password = hashed_pass;
    user.Phase = "initial testing";
    const newUser = await usermodel.create(user);

    const payLoad = {
      id: user._id,
      username: user.username,
    };

    const token = jwt.sign(payLoad, signingKey);

    newUser.password = "";
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
    const username2 = username.toLowerCase();
    const user = await usermodel.findOne({ username: username2 });
    if (!user) {
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
      username: user.username,
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
