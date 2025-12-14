const route = require("express").Router();

const { addSongs, getSongByArtist } = require("../controllers");
const { getAllSongs, getMusicById } = require("../controllers");
const { getTopSongs } = require("../controllers");

const { protect, guest } = require("../middlewares/protection");
const upload = require("../utils/fileUpload");

route.post(
  "/upload",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "music", maxCount: 1 },
  ]),
  addSongs
);
route.get("/top", getTopSongs);
route.get("/artist", getSongByArtist)
route.get("/artist/:artist", getSongByArtist)
route.get("/:id", getMusicById);
route.get("/", getAllSongs);
module.exports = route;
