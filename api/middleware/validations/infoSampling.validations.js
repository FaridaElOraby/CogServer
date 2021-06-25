const Joi = require("joi");
const { validation } = require("../../constants/statusCodes");

const validateAddRecord = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    evaluation: Joi.string().required(),
    round: Joi.number().required(),
    openBags: Joi.number().required(),
    openClothes: Joi.number().required(),
    correctAnswer: Joi.string().required(),
    userAnswer: Joi.string().required(),
    timePassed: Joi.string().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.json({
      statusCode: validation,
      error: error.details[0].message,
    });
  }
  return next();
};

module.exports = {
  validateAddRecord,
};
