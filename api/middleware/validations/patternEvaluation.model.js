const Joi = require("joi");
const { validation } = require("../../constants/statusCodes");

const valdiateAddRecord = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    chosenPattern: Joi.string().required(),
    round: Joi.number().required(),
    evaluation: Joi.string().required(),
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
  valdiateAddRecord,
};
