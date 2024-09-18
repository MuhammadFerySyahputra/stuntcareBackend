const Joi = require('joi');

const createKomentarValidation = Joi.object({
  nama: Joi.string().required(),
  komentar: Joi.string().required(),
  mpasiId: Joi.number().integer().positive().optional(),
  artikelId: Joi.number().integer().positive().optional(),
});

const getKomentarValidation = Joi.number().positive().required();

module.exports = {
  createKomentarValidation,
  getKomentarValidation,
};
