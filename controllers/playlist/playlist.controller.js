const db = require("../../models")
const Playlist = db.Playlist
const Song = db.Song

const addPlaylist = async (req, res) => {
    if (!req.body.name) {
    return res.status(400).json({
        message: "Playlist name is required"
    })
}
    try {
        const playlist = await Playlist.create({
            name: req.body.name,
            userId: req.session.user.id
        })
        res.status(200).json({
            message: "Successfully created!",
            playlist
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            error: error.message
        })
    }
}
const getPlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findAll({raw: true, where: {userId: req.session.user.id}})
        res.status(200).json(playlist)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const addSongToPlaylist = async (req, res) => {
    try {
        // login tekshiruvi
        if (!req.session?.user?.id) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const { playlistId, songId } = req.params

        // playlistni tekshiramiz (userga tegishlimi?)
        const playlist = await Playlist.findOne({
            where: {
                id: playlistId,
                userId: req.session.user.id
            }
        })

        if (!playlist) {
            return res.status(404).json({
                message: "Playlist topilmadi"
            })
        }

        // song mavjudmi?
        const song = await Song.findByPk(songId)
        if (!song) {
            return res.status(404).json({
                message: "Song topilmadi"
            })
        }

        // 🔥 many-to-many asosiy joy
        await playlist.addSong(song)

        res.status(200).json({
            message: "Song playlistga qo‘shildi"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}
const getPlaylistWithSongs = async (req, res) => {
    try {
        const playlist = await Playlist.findOne({
            where: {
                id: req.params.id,
                userId: req.session.user.id
            },
            include: {
                model: Song,
                as: "songs"
            }
        })

        res.status(200).json(playlist)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
module.exports = {
    addPlaylist,
    getPlaylist,
    addSongToPlaylist,
    getPlaylistWithSongs
}