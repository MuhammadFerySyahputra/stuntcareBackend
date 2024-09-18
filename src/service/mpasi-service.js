const { Op } = require('sequelize');
const Mpasi = require('../models/mpasi');
const { validate } = require('../validation/validation');
const MpasiValidation = require('../validation/mpasi-validation');
const ResponseError = require('../error/response-error');

const createMpasi = async (mpasiData) => {
  const validatedArrayData = validate(MpasiValidation.createMpasiArrayValidation, mpasiData);
  const mpasiPromises = validatedArrayData.map((data) => Mpasi.create(data));
  const mpasiResults = await Promise.all(mpasiPromises);

  return mpasiResults;
};

const getAllMpasi = async (category, status, searchQuery, page = 1, limit = 12) => {
  const offset = (page - 1) * limit;

  const queryOptions = {
    where: {},
    limit,
    offset,
  };

  if (category) {
    queryOptions.where.kategori = category;
  }

  if (searchQuery) {
    queryOptions.where.makanan = {
      [Op.like]: `%${searchQuery}%`,
    };
  }
  if (status) {
    queryOptions.where.status = status;
  }

  const { rows: mpasiList, count } = await Mpasi.findAndCountAll(queryOptions);
  if (!mpasiList) {
    throw new ResponseError(404, 'Gagal mendapatkan data Makanan');
  }
  return { mpasiList, count };
};

const getMpasiById = async (mpasiId) => {
  const validatedId = validate(MpasiValidation.getMpasiValidation, mpasiId);
  const mpasi = await Mpasi.findByPk(validatedId);
  if (!mpasi) {
    throw new ResponseError(404, 'Gagal mendapatkan detail Makanan');
  }
  return mpasi;
};

const updateMpasi = async (mpasiId, updatedData) => {
  const validatedId = validate(MpasiValidation.getMpasiValidation, mpasiId);
  const validatedData = validate(MpasiValidation.updateMpasiValidation, updatedData);

  const mpasi = await Mpasi.findByPk(validatedId);
  if (!mpasi) {
    throw new ResponseError(404, 'Gagal mengubah data Makanan');
  }

  await mpasi.update(validatedData);
  return mpasi;
};

const deleteMpasiById = async (mpasiId) => {
  const validatedId = validate(MpasiValidation.getMpasiValidation, mpasiId);
  const mpasi = await Mpasi.findByPk(validatedId);
  if (!mpasi) {
    throw new ResponseError(404, 'Gagal menghapus data makanan');
  }

  await mpasi.destroy();
};

const publishMpasi = async (mpasiId) => {
  const mpasi = await Mpasi.findByPk(mpasiId);
  if (!mpasi) {
    throw new ResponseError(404, 'Gagal mempublikasikan data Makanan');
  }
  await mpasi.update({ status: 'published' });
  return mpasi;
};

module.exports = {
  createMpasi,
  getAllMpasi,
  getMpasiById,
  updateMpasi,
  deleteMpasiById,
  publishMpasi,
};
