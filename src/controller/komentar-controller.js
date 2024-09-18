const KomentarService = require('../service/komentar-service');

const createKomentar = async (req, res, next) => {
  try {
    const komentar = await KomentarService.createKomentar(req.body);
    res.status(201).json({ message: 'Sukses menambahkan komentar', data: komentar });
  } catch (error) {
    next(error);
  }
};

const deleteKomentar = async (req, res, next) => {
  const komentarId = req.params.id;
  try {
    await KomentarService.deleteKomentar(komentarId);
    res.status(200).json({ message: 'Berhasil menghapus komentar' });
  } catch (error) {
    next(error);
  }
};

const getKomentarByArtikelId = async (req, res, next) => {
  const { artikelId } = req.params;
  try {
    const komentar = await KomentarService.getKomentarByArtikelId(artikelId);
    res.status(200).json({ message: 'Sukses mendapatkan komentar', data: komentar });
  } catch (error) {
    next(error);
  }
};

const getKomentarByMpasiId = async (req, res, next) => {
  const { mpasiId } = req.params;
  try {
    const komentar = await KomentarService.getKomentarByMpasiId(mpasiId);
    res.status(200).json({ message: 'Sukses mendapatkan komentar', data: komentar });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createKomentar,
  deleteKomentar,
  getKomentarByArtikelId,
  getKomentarByMpasiId,
};
