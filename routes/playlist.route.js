const route = require("express").Router();

const {
  addPlaylist,
  getPlaylist,
  addSongToPlaylist,
  getPlaylistWithSongs,
} = require("../controllers");

const { protect } = require("../middlewares/protection");

/**
 * @swagger
 * /playlist/add:
 *   post:
 *     summary: Create new playlist
 *     tags: [Playlist]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: My favorite songs
 *     responses:
 *       200:
 *         description: Playlist created successfully
 *       401:
 *         description: Unauthorized
 */
route.post("/add", protect, addPlaylist);

/**
 * @swagger
 * /playlist:
 *   get:
 *     summary: Get all playlists of logged-in user
 *     tags: [Playlist]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of playlists
 *       401:
 *         description: Unauthorized
 */
route.get("/", protect, getPlaylist);

/**
 * @swagger
 * /playlist/{playlistId}/song/{songId}:
 *   post:
 *     summary: Add song to playlist
 *     tags: [Playlist]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Playlist ID
 *       - in: path
 *         name: songId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Song ID
 *     responses:
 *       200:
 *         description: Song added to playlist
 *       404:
 *         description: Playlist or Song not found
 *       401:
 *         description: Unauthorized
 */
route.post("/:playlistId/song/:songId", protect, addSongToPlaylist);

/**
 * @swagger
 * /playlist/{id}:
 *   get:
 *     summary: Get playlist with all songs
 *     tags: [Playlist]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Playlist ID
 *     responses:
 *       200:
 *         description: Playlist with songs
 *       404:
 *         description: Playlist not found
 *       401:
 *         description: Unauthorized
 */
route.get("/:id", protect, getPlaylistWithSongs);

module.exports = route;
