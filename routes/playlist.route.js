const route = require("express").Router()

const  { addPlaylist, getPlaylist, addSongToPlaylist, getPlaylistWithSongs } = require("../controllers")

const { protect, guest } = require("../middlewares/protection")
const upload = require("../utils/fileUpload")

route.post("/add", protect, addPlaylist)
route.get("/", protect, getPlaylist)
route.post("/:playlistId/song/:songId", protect, addSongToPlaylist)
route.get("/:id", protect, getPlaylistWithSongs)

    
module.exports = route