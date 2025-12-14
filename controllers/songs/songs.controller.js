const db = require("../../models")
const Song = db.Song

const addSongs = async(req, res)=>{
    try {
        const newSong = await Song.create({
            name: req.body.name,
            url: `${req.protocol}://${req.get("host")}/uploads/${req.files.music[0].filename}`,
            image: `${req.protocol}://${req.get("host")}/uploads/${req.files.image[0].filename}`,
            artist: "Konsta",
            // userId: req.session.user.id
        })
        res.status(201).json({
            message: "Successfully music created!",
            music: newSong
        })
    } catch (error) {
        res.json({error: error.message})
    }
}
const getAllSongs = async (req, res) => {
    try {
        const musics = await Song.findAll({
            raw: true
        })
        res.status(200).json(musics)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getMusicById = async (req, res) => {
    try {
        const music = await Song.findByPk(req.params.id)
        if(!music){
            return res.status(404).json({
                message: "Musiqa topilmadi!"
            })
        }
        await Song.update({
            views: music.views + 1
        }, {
            where: {id: req.params.id}
        })
        res.status(200).json(music)
    } catch (error) {
         res.status(500).json({
            error: error.message
        })
    }
}

const getTopSongs = async (req, res) => {
    try {
        const topSongs = await Song.findAll({
            order: [['views', 'DESC']],
            limit: 20
        });

        res.status(200).json({
            success: true,
            data: topSongs
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Top 10 musiqalarni olishda xatolik yuz berdi."
        });
    }
};
const getSongByArtist = async (req, res) => {
    try {
        const artistName = req.query.artist || req.params.artist;

        const songs = await db.Song.findAll({
            where: { artist: artistName },
        });

        if (!songs.length) {
            return res.status(404).json({
                success: false,
                message: `Hech qanday musiqa topilmadi: ${artistName}`
            });
        }

        res.status(200).json({ success: true, data: songs });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Musiqalarni olishda xatolik yuz berdi."
        });
    }
};


module.exports = {
    addSongs,
    getAllSongs,
    getMusicById,
    getTopSongs,
    getSongByArtist
}