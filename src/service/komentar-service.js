const { validate } = require('../validation/validation');
const KomentarValidation = require('../validation/komentar-validation');
const Komentar = require('../models/komentar');

const createKomentar = async (komentarData) => {
  const validatedData = validate(KomentarValidation.createKomentarValidation, komentarData);
  const komentar = await Komentar.create(validatedData);
  return komentar;
};

const deleteKomentar = async (komentarId) => {
  const validatedId = validate(KomentarValidation.getKomentarValidation, komentarId);
  const komentar = await Komentar.findByPk(validatedId);
  if (!komentar) {
    throw new Error('Komentar tidak ditemukan');
  }
  await komentar.destroy();
};

const getKomentarByArtikelId = async (artikelId) => {
  const validatedId = validate(KomentarValidation.getKomentarValidation, artikelId);
  const komentar = await Komentar.findAll({ where: { artikelId: validatedId } });
  return komentar;
};

const getKomentarByMpasiId = async (mpasiId) => {
  const validatedId = validate(KomentarValidation.getKomentarValidation, mpasiId);
  const komentar = await Komentar.findAll({ where: { mpasiId: validatedId } });
  return komentar;
};

module.exports = {
  createKomentar,
  deleteKomentar,
  getKomentarByArtikelId,
  getKomentarByMpasiId,
};
