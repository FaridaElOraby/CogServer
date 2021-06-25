const usermodel = require("../../models/user.model");
const patternMetamodel = require("../../models/patternMeta.model");

const { entityNotFound } = require("../constants/statusCodes");

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
    const newRecord = await patternMetamodel.create(data);

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
