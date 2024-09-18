/* eslint-disable */
const express = require('express');
const komentarController = require('../controller/komentar-controller');
const mpasiController = require('../controller/mpasi-controller');
const artikelController = require('../controller/artikel-controller');
const verifyToken = require("../middleware/auth");
const authorize = require("../middleware/auth-role");
const logController = require("../controller/log-controller");



const userRouter = new express.Router();

// Komentar API
userRouter.post('/api/komentar', komentarController.createKomentar);
userRouter.delete('/api/komentar/:id', komentarController.deleteKomentar);
userRouter.get('/api/komentar/artikel/:artikelId', komentarController.getKomentarByArtikelId);
userRouter.get('/api/komentar/mpasi/:mpasiId', komentarController.getKomentarByMpasiId);

// MPASI API
userRouter.post("/api/mpasi", authorize, mpasiController.createMpasi);
userRouter.get('/api/mpasi', mpasiController.getAllMpasi);
userRouter.get('/api/mpasi/:id', mpasiController.getMpasiById);
userRouter.put("/api/mpasi/:id", verifyToken, mpasiController.updateMpasi);
userRouter.delete("/api/mpasi/:id", verifyToken, mpasiController.deleteMpasi);

// Artikel API
userRouter.post("/api/artikel", artikelController.createArtikel);
userRouter.put("/api/artikel/:id", authorize, artikelController.updateArtikel);
userRouter.delete('/api/artikel/:id', authorize, artikelController.deleteArtikel);

// Rute yang tidak memerlukan autentikasi
userRouter.get("/api/artikel", artikelController.getAllArtikel);
userRouter.get('/api/artikel/:id', artikelController.getArtikelById)


// Log History API
userRouter.post("/api/log", authorize,  logController.createLog);
userRouter.get("/api/log", logController.getLogs);
userRouter.delete("/api/log", logController.deleteAllLogs);
userRouter.get("/api/log/user/:userRole", logController.getLogsByUserRole);
userRouter.get('/api/log/entity/:entity/:entityId', logController.getLogsByEntity);



module.exports = userRouter;
