// Admin
const { 
    adminRegister, 
    getAdminPage,
 } = require("./auth/admin.controller");
 //Auth
const { 
    registerUser,
    login,
    logout,
 } = require('./auth/auth.controller')

// User
const {
    putUser,
    deleteUser,
} = require("./auth/user.controller")



//Songs
const { 
    addSongs,
    getAllSongs,
    getMusicById,
    getTopSongs,
    getSongByArtist
 } = require('./songs/songs.controller')


// Playlist

const {
    addPlaylist,
    getPlaylist,
    addSongToPlaylist,
    getPlaylistWithSongs
} = require("./playlist/playlist.controller")
//Export
module.exports = {
    adminRegister,
    registerUser,
    getAdminPage,
    login,
    logout,
    putUser,
    deleteUser,
    addSongs,
    getAllSongs,
    getMusicById,
    getTopSongs,
    getSongByArtist,
    addPlaylist,
    getPlaylist,
    addSongToPlaylist,
    getPlaylistWithSongs
}