const route = require("express").Router();
const { addSongs, getSongByArtist, getAllSongs, getMusicById, getTopSongs } = require("../controllers");
const { protect, guest } = require("../middlewares/protection");
const upload = require("../utils/fileUpload");

/**
 * @swagger
 * /songs/upload:
 *   post:
 *     summary: Yangi qo'shiq qo'shish
 *     description: Foydalanuvchi qo'shiq va rasmni yuklaydi. Faqat ro'yxatdan o'tgan foydalanuvchilar kirishi mumkin.
 *     tags:
 *       - Songs
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               music:
 *                 type: string
 *                 format: binary
 *               image:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *                 example: "Qo'shiq nomi"
 *               artist:
 *                 type: string
 *                 example: "San'atkor nomi"
 *     responses:
 *       201:
 *         description: Qo'shiq muvaffaqiyatli qo'shildi
 *       400:
 *         description: Notog'ri ma'lumot yuborilgan
 */
route.post(
  "/upload",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "music", maxCount: 1 },
  ]),
  addSongs
);

/**
 * @swagger
 * /songs/top:
 *   get:
 *     summary: Eng mashhur qo'shiqlar
 *     description: Eng ko'p tinglangan qo'shiqlar ro'yxatini beradi
 *     tags:
 *       - Songs
 *     responses:
 *       200:
 *         description: Qo'shiqlar ro'yxati
 */
route.get("/top", getTopSongs);

/**
 * @swagger
 * /songs/artist:
 *   get:
 *     summary: San'atkorlar bo'yicha qo'shiqlar
 *     description: Barcha san'atkorlarning qo'shiqlarini ro'yxatini beradi
 *     tags:
 *       - Songs
 *     responses:
 *       200:
 *         description: San'atkorlar bo'yicha qo'shiqlar ro'yxati
 */

/**
 * @swagger
 * /songs/artist/{artist}:
 *   get:
 *     summary: Muayyan san'atkorning qo'shiqlari
 *     description: URL parametr orqali san'atkor nomi bo'yicha qo'shiqlarni qaytaradi
 *     tags:
 *       - Songs
 *     parameters:
 *       - in: path
 *         name: artist
 *         required: true
 *         schema:
 *           type: string
 *         description: San'atkor nomi
 *     responses:
 *       200:
 *         description: San'atkorning qo'shiqlari
 */
route.get("/artist", getSongByArtist);
route.get("/artist/:artist", getSongByArtist);

/**
 * @swagger
 * /songs/{id}:
 *   get:
 *     summary: Qo'shiqni ID bo'yicha olish
 *     description: URL parametr orqali qo'shiqni ID bilan qaytaradi
 *     tags:
 *       - Songs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Qo'shiq ID
 *     responses:
 *       200:
 *         description: Qo'shiq ma'lumotlari
 *       404:
 *         description: Qo'shiq topilmadi
 */
route.get("/:id", getMusicById);

/**
 * @swagger
 * /songs:
 *   get:
 *     summary: Barcha qo'shiqlar
 *     description: Barcha qo'shiqlar ro'yxatini qaytaradi
 *     tags:
 *       - Songs
 *     responses:
 *       200:
 *         description: Qo'shiqlar ro'yxati
 */
route.get("/", getAllSongs);

module.exports = route;
