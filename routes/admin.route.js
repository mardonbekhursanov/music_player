const route = require("express").Router();
const { 
  updateAdmin, 
  getAdminPage, 
} = require("../controllers");

const isAdmin = require("../middlewares/isadmin");
const { protect } = require("../middlewares/protection");

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Get admin dashboard
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Admin page data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 */
route.get("/", protect, isAdmin, getAdminPage);

module.exports = route;
