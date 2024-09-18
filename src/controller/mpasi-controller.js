/* eslint-disable */
const MpasiService = require('../service/mpasi-service');

const createMpasi = async (req, res, next) => {
  try {
    if (!req.cookies.accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const mpasi = await MpasiService.createMpasi(req.body);
    res.status(201).json({ message: 'Sukses menambahkan data Makanan', data: mpasi });
  } catch (error) {
    next(error);
  }
};

const getAllMpasi = async (req, res, next) => {
  const category = req.query.kategori;
  const searchQuery = req.query.q;
  const { status } = req.query;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 12;

  try {
    const { mpasiList, count } = await MpasiService.getAllMpasi(category, status, searchQuery, page, limit);
    const mpasiData = mpasiList.map((mpasi) => mpasi.toJSON());
    res.status(200).json({
      message: 'Sukses mendapatkan data Makanan',
      data: mpasiData,
      total: count,
      page,
      pages: Math.ceil(count / limit),
    });
  } catch (error) {
    next(error);
  }
};

const getMpasiById = async (req, res, next) => {
  const mpasiId = req.params.id;
  try {
    const mpasi = await MpasiService.getMpasiById(mpasiId);
    if (!mpasi) {
      res.status(404).json({ message: 'Data MPASI tidak ditemukan' });
    } else {
      res.status(200).json({ message: 'Sukses mendapatkan detail Makanan', data: mpasi });
    }
  } catch (error) {
    next(error);
  }
};

const updateMpasi = async (req, res, next) => {
  const mpasiId = req.params.id;
  try {
    if (!req.cookies.accessToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const updatedMpasi = await MpasiService.updateMpasi(mpasiId, req.body);
    res.json({ message: 'Sukses mengubah data Makanan', data: updatedMpasi });
  } catch (error) {
    next(error);
  }
};

const deleteMpasi = async (req, res, next) => {
  const mpasiId = req.params.id;
  try {
    if (!req.cookies.accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await MpasiService.deleteMpasiById(mpasiId);
    res.status(200).json({ message: 'Berhasil menghapus data makanan' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMpasi,
  getAllMpasi,
  getMpasiById,
  updateMpasi,
  deleteMpasi,
};
