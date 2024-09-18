const Joi = require('joi');

const createArtikelValidation = Joi.object({
  judul: Joi.string().required(),
  deskripsi: Joi.string().required(),
  tanggal: Joi.date().iso().required(),
  sumber: Joi.string().uri().required(),
  gambar: Joi.string().uri().optional(),
  kategori: Joi.string().required(),
  status: Joi.string().valid('draft', 'published').default('draft'),
});

const createArtikelArrayValidation = Joi.array().items(createArtikelValidation);

const getArtikelValidation = Joi.number().positive().required();

const updateArtikelValidation = Joi.object({
  judul: Joi.string().optional(),
  deskripsi: Joi.string().optional(),
  tanggal: Joi.date().iso().optional(),
  sumber: Joi.string().uri().optional(),
  gambar: Joi.string().uri().optional(),
  kategori: Joi.string().optional(),
  status: Joi.string().valid('draft', 'published').optional(),
});

module.exports = {
  createArtikelValidation,
  updateArtikelValidation,
  getArtikelValidation,
  createArtikelArrayValidation,
};
