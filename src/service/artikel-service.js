/* eslint-disable */
const { Op } = require('sequelize');
const Artikel = require('../models/artikel');
const ResponseError = require('../error/response-error');
const ArtikelValidation = require('../validation/artikel-validation');
const { validate } = require('../validation/validation');

const createArtikel = async (artikelData) => {

  const validatedArrayData = validate(ArtikelValidation.createArtikelArrayValidation, artikelData);
  const artikelPromises = validatedArrayData.map((data) =>
    Artikel.create(data)
  );
  const artikelResults = await Promise.all(artikelPromises);

  return artikelResults;
};

const getAllArtikel = async (category, status, searchQuery, page = 1, limit = 12, order = 'DESC') => {
  const offset = (page - 1) * limit;

  const queryOptions = {
    where: {},
    limit,
    offset,
    order: [['tanggal', order]],
  };

  if (category) {
    queryOptions.where.kategori = category;
  }

  if (searchQuery) {
    queryOptions.where.judul = {
      [Op.like]: `%${searchQuery}%`,
    };
  }

  if (status) {
    queryOptions.where.status = status;
  }

  console.log("Query options:", queryOptions);

  const { rows: artikelList, count } = await Artikel.findAndCountAll(queryOptions);
  if (!artikelList) {
    throw new ResponseError(404, 'Gagal mendapatkan artikel');
  }
  return { artikelList, count };
};

const getArtikelById = async (artikelId) => {
  const validatedId = validate(ArtikelValidation.getArtikelValidation, artikelId);
  const artikel = await Artikel.findByPk(validatedId);
  if (!artikel) {
    throw new ResponseError(404, 'Gagal mendapatkan detail artikel');
  }
  return artikel;
};

const updateArtikel = async (artikelId, updatedData) => {
  const validatedId = validate(ArtikelValidation.getArtikelValidation, artikelId);
  const validatedData = validate(ArtikelValidation.updateArtikelValidation, updatedData);

  const artikel = await Artikel.findByPk(validatedId);
  if (!artikel) {
    throw new ResponseError(404, 'Gagal mengubah artikel');
  }

  await artikel.update(validatedData);
  return artikel;
};

const deleteArtikelById = async (artikelId) => {
  const validatedId = validate(ArtikelValidation.getArtikelValidation, artikelId);
  const artikel = await Artikel.findByPk(validatedId);
  if (!artikel) {
    throw new ResponseError(404, 'Gagal menghapus artikel');
  }

  await artikel.destroy();
};
const publishArtikel = async (artikelId) => {
  const artikel = await Artikel.findByPk(artikelId);
  if (!artikel) {
    throw new ResponseError(404, 'Gagal mendapatkan artikel');
  }

  await artikel.update({ status: 'published' });
  return artikel;
};

module.exports = {
  createArtikel,
  getAllArtikel,
  getArtikelById,
  updateArtikel,
  deleteArtikelById,
  publishArtikel,
};
