/* eslint-disable*/
require("dotenv").config();
const express = require("express");
const axios = require("axios");

const router = express.Router();
const BASE_URL = process.env.BASE_URL;
const verifyToken = require("../middleware/auth");

router.get("/", (req, res) => {
  res.render("index", { title: "Login" });
});

router.get("/dashboard", verifyToken, async (req, res) => {
  try {
    const mpasiApi = await axios.get(`${BASE_URL}/api/mpasi?limit=10000`);
    const artikelApi = await axios.get(`${BASE_URL}/api/artikel?limit=10000`);
    const mpasi = mpasiApi.data;
    const artikel = artikelApi.data;
    const artikelDraft = artikel.data.filter(
      (artikel) => artikel.status === "draft"
    );
    const artikelPublished = artikel.data.filter(
      (artikel) => artikel.status === "published"
    );
    const mpasiDraft = mpasi.data.filter((mpasi) => mpasi.status === "draft");
    const mpasiPublished = mpasi.data.filter(
      (mpasi) => mpasi.status === "published"
    );
    res.render("dashboard", {
      title: "Beranda",
      MpasiTotal: mpasi.total,
      ArtikelTotal: artikel.total,
      MpasiDraft: mpasiDraft.length,
      MpasiPublished: mpasiPublished.length,
      ArtikelDraft: artikelDraft.length,
      ArtikelPublished: artikelPublished.length,
    });
  } catch (error) {
    res.status(500).render("auth", { title: "Membutuhkan Login" });
  }
});

router.get("/mpasi", verifyToken, async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    res.locals.userRole = req.cookies.userRole;
    const mpasiApi = await axios.get(
      `${BASE_URL}/api/mpasi?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${verifyToken.accessToken}`,
        },
      }
    );
    const mpasi = mpasiApi.data;
    const mpasiDraft = mpasi.data.filter((mpasi) => mpasi.status === "draft");
    const mpasiPublished = mpasi.data.filter(
      (mpasi) => mpasi.status === "published"
    );

    res.render("mpasi", {
      title: "Mpasi",
      total: mpasi.total,
      data: mpasi.data,
      pages: mpasi.pages,
      page: mpasi.page,
      limit,
      mpasiDraft,
      mpasiPublished,
    });
  } catch (error) {
    res.status(500).send("Error fetching MPASI data, No Access Token");
  }
});

router.get("/artikel", verifyToken, async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    res.locals.userRole = req.cookies.userRole;
    const artikelApi = await axios.get(
      `${BASE_URL}/api/artikel?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${verifyToken.accessToken}`,
        },
      }
    );
    const artikel = artikelApi.data;
    const artikelDraft = artikel.data.filter(
      (artikel) => artikel.status === "draft"
    );
    const artikelPublished = artikel.data.filter(
      (artikel) => artikel.status === "published"
    );

    // res.json(artikel);
    res.render("artikel", {
      title: "Artikel",
      total: artikel.total,
      data: artikel.data,
      pages: artikel.pages,
      page: artikel.page,
      limit,
    });
  } catch (error) {
    res.status(500).send("Error fetching Artikel data, No Access Token");
  }
});

router.get("/logpage", verifyToken, async (req, res) => {
  try {
    // Ambil data logs dari API
    const logsApi = await axios.get(`${BASE_URL}/api/log`);
    const logs = logsApi.data.data;

    res.render("logpage", { title: "Log Page", logs });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res
      .status(500)
      .render("error", { title: "Error", message: "Error fetching logs" });
  }
});

router.use((req, res) => {
  res.status(404).render("notfound", { title: "Halaman Tidak Ditemukan" });
});

module.exports = router;
