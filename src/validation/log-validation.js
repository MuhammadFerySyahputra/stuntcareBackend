const Joi = require('joi');

const createLogValidation = Joi.object({
  userRole: Joi.string().required(),
  action: Joi.string().required(),
  entity: Joi.string().required(),
  entityId: Joi.number().integer().positive().optional(),
});

module.exports = {
  createLogValidation,
};
