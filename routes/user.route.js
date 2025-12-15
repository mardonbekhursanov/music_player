const route = require("express").Router()
const { putUser, deleteUser } = require("../controllers")
const { protect, guest } = require("../middlewares/protection")
const upload = require("../utils/fileUpload")

/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: Foydalanuvchi ma'lumotlarini yangilash
 *     description: Foydalanuvchi profil ma'lumotlarini va rasmni yangilashi mumkin. Faqat ro'yxatdan o'tgan foydalanuvchilar kirishi mumkin.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "mardonbek_updated"
 *               phone:
 *                 type: number
 *                 example: +998123456789
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli yangilandi
 *       400:
 *         description: Notog'ri ma'lumot yuborilgan
 *       401:
 *         description: Foydalanuvchi tizimga kirishi kerak
 */
route.put("/update", protect, upload.single("image_url"), putUser)

/**
 * @swagger
 * /user/delete:
 *   delete:
 *     summary: Foydalanuvchini o'chirish
 *     description: Foydalanuvchi o'z hisobini o'chiradi. Faqat ro'yxatdan o'tgan foydalanuvchilar kirishi mumkin.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli o'chirildi
 *       401:
 *         description: Foydalanuvchi tizimga kirishi kerak
 */
route.delete("/delete", protect, deleteUser)

module.exports = route
