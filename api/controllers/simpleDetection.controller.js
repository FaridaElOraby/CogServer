const usermodel = require("../../models/user.model");
const simpleDetectionmodel = require("../../models/simpleDetection.model");

const { success, entityNotFound } = require("../constants/statusCodes");

const addRecord = async (req, res) => {
  try {
    const data = req.body;
    const userFound = await usermodel.findOne({ username: data.username });
    if (!userFound) {
      return res.json({
        statusCode: entityNotFound,
        error: "Username does not exist",
      });
    }
    const newRecord = await simpleDetectionmodel.create(data);

    return res.json({ statusCode: success, record: newRecord });
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
      statusCode: unknown,
    });
  }
};

module.exports = {
  addRecord,
};
