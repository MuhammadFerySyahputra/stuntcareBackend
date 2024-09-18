/* eslint-disable */
const ArtikelService = require("../service/artikel-service");

const createArtikel = async (req, res, next) => {
  try {
    // if (!req.cookies.accessToken) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    const artikelData = req.body;
    const artikel = await ArtikelService.createArtikel(artikelData);
    res
      .status(201)
      .json({ message: "Sukses menambahkan data Artikel", data: artikel });
  } catch (error) {
    next(error);
  }
};

const getAllArtikel = async (req, res, next) => {
  const category = req.query.kategori;
  const searchQuery = req.query.q;
  const status = req.query.status;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 12;
  const order = req.query.order === "asc" ? "ASC" : "DESC";

  try {
    const { artikelList, count } = await ArtikelService.getAllArtikel(
      category,
      status,
      searchQuery,
      page,
      limit,
      order
    );

    const artikelData = artikelList.map((artikel) => artikel.toJSON());

    res.status(200).json({
      message: "Sukses mendapatkan data Artikel",
      data: artikelData,
      total: count,
      page,
      pages: Math.ceil(count / limit),
    });
  } catch (error) {
    next(error);
  }
};

const getArtikelById = async (req, res, next) => {
  const artikelId = req.params.id;
  try {
    const artikel = await ArtikelService.getArtikelById(artikelId);
    if (!artikel) {
      res.status(404).json({ message: "Data Artikel tidak ditemukan" });
    } else {
      res
        .status(200)
        .json({ message: "Sukses mendapatkan detail Makanan", data: artikel });
    }
  } catch (error) {
    next(error);
  }
};

const updateArtikel = async (req, res, next) => {
  const artikelId = req.params.id;
  try {
    if (!req.cookies.accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const updatedArtikel = await ArtikelService.updateArtikel(
      artikelId,
      req.body
    );
    res.json({ message: "Sukses mengubah artikel", data: updatedArtikel });
  } catch (error) {
    next(error);
  }
};

const deleteArtikel = async (req, res, next) => {
  const artikelId = req.params.id;
  try {
    if (!req.cookies.accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await ArtikelService.deleteArtikelById(artikelId);
    res.status(200).json({ message: "Berhasil menghapus artikel" });
  } catch (error) {
    next(error);
  }
};

const publishArtikel = async (req, res, next) => {
  try {
    if (!req.cookies.accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { id } = req.params;
    const artikel = await Artikel.findByPk(id);
    if (!artikel) {
      return res.status(404).json({ message: "Artikel tidak ditemukan" });
    }
    artikel.status = "published";
    await artikel.save();
    res
      .status(200)
      .json({ message: "Artikel berhasil dipublikasikan", data: artikel });
  } catch (error) {
    res.status(500).send("Error fetching Artikel data, No Access Token");
    next(error);
  }
};

module.exports = {
  createArtikel,
  getAllArtikel,
  getArtikelById,
  updateArtikel,
  deleteArtikel,
  publishArtikel,
};
