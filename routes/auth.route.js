const route = require("express").Router()
const { registerUser, login, logout } = require("../controllers")
const { protect, guest } = require("../middlewares/protection")
const upload = require("../utils/fileUpload")

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Foydalanuvchi ro'yxatdan o'tkazish
 *     description: Yangi foydalanuvchi yaratadi va profil rasmi yuklash imkoniyatini beradi
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "mardonbek"
 *               phone:
 *                 type: string
 *                 example: +998123456789
 *               password:
 *                 type: string
 *                 example: "123456"
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi
 *       400:
 *         description: Notog'ri ma'lumot yuborilgan
 */
route.post("/register", upload.single("image_url"), registerUser)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Foydalanuvchi tizimga kirishi
 *     description: Email va parol orqali tizimga kiradi
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: +998123456789
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Foydalanuvchi tizimga muvaffaqiyatli kirdi
 *       401:
 *         description: Telefon yoki parol noto‘g‘ri
 */
route.post("/login", guest, login)

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Foydalanuvchini tizimdan chiqazish
 *     description: Foydalanuvchi token orqali tizimdan chiqadi
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli chiqdi
 *       401:
 *         description: Token noto‘g‘ri yoki yo‘q
 */
route.post('/logout', protect, logout)

module.exports = route
