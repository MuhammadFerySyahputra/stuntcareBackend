const Joi = require('joi');

const createMpasiValidation = Joi.object({
  makanan: Joi.string().required(),
  porsi: Joi.number().integer().min(1).required(),
  bahan: Joi.object().pattern(
    Joi.string(),
    Joi.string().required(),
  ).required(),
  cara_masak: Joi.array().items(Joi.string().required()).required(),
  kandungan: Joi.object().pattern(
    Joi.string(),
    Joi.string().optional(),
  ).optional(),
  kategori: Joi.string().required(),
  gambar: Joi.string().uri().required(),
  kalori: Joi.number().min(0).optional(),
  protein: Joi.number().min(0).optional(),
  lemak: Joi.number().min(0).optional(),
  karbohidrat: Joi.number().min(0).optional(),
  status: Joi.string().valid('draft', 'published').default('draft'),
});

const updateMpasiValidation = Joi.object({
  makanan: Joi.string().optional(),
  porsi: Joi.number().integer().min(1).optional(),
  bahan: Joi.object().pattern(
    Joi.string(),
    Joi.string().optional(),
  ).optional(),
  cara_masak: Joi.array().items(Joi.string().optional()).optional(),
  kandungan: Joi.object().pattern(
    Joi.string(),
    Joi.string().optional(),
  ).optional(),
  kategori: Joi.string().optional(),
  gambar: Joi.string().uri().optional(),
  kalori: Joi.number().min(0).optional(),
  protein: Joi.number().min(0).optional(),
  lemak: Joi.number().min(0).optional(),
  karbohidrat: Joi.number().min(0).optional(),
  status: Joi.string().valid('draft', 'published').optional(),
});

const createMpasiArrayValidation = Joi.array().items(createMpasiValidation);

const getMpasiValidation = Joi.number().positive().required();

module.exports = {
  createMpasiValidation,
  updateMpasiValidation,
  getMpasiValidation,
  createMpasiArrayValidation,
};
