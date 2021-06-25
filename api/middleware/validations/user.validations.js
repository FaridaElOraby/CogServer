const Joi = require("joi");
const { validation } = require("../../constants/statusCodes");
const { gender } = require("../../constants/enums");
const valdiateLogIn = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
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
const validateAddUser = (req, res, next) => {
  const schema = Joi.object({
    gender: Joi.string().valid(gender.MALE, gender.FEMALE),
    username: Joi.string().required(),
    password: Joi.string().required(),
    birthYear: Joi.string().required(),
    educationalLevel: Joi.string().required(),
    mentalIllness: Joi.string(),
    notes: Joi.string(),
    medication: Joi.string(),
    caffiene: Joi.number().required(),
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
  valdiateLogIn,
  validateAddUser,
};
