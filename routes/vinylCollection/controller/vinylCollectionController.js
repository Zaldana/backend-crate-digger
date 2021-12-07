const Album = require('../model/Album');
const User = require('../../users/model/User');
const dbErrorHelper = require("../../lib/dbErrorHelper/dbErrorHelper")

async function getAllAlbums(req, res) {

    let currentAlbumCollection = await Album.find({});
    res.json({ message: "success", currentAlbumCollection })

};

async function addToCollection(req, res) {

    try {

        const decodedData = res.locals.decodedData
        let foundUser = await User.findOne({ email: decodedData.email })
        
        const {
            albumName,
            albumCover,
            albumId,
            albumArtist,
            albumYear,
            albumLabel,
            albumTracklist,
            albumCondition
        } = req.body;

        const newAlbum = new Album({
            albumName,
            albumCover,
            albumId,
            albumArtist,
            albumYear,
            albumLabel,
            albumTracklist,
            albumCondition,
            userID: foundUser._id
        })

        let savedAlbum = await newAlbum.save();

        foundUser.vinylCollection.push(savedAlbum._id);
        await foundUser.save();
        res.json({ message: "success", newAlbum })

    } catch (e) {

        const { message, statusCode } = dbErrorHelper(e);

        res.status(statusCode).json({
            message: message,
        });

    }

};

async function deleteAlbum(req, res) {

    try {

        let deletedAlbum = await Album.findByIdAndRemove(req.params.id);

        if (!deletedAlbum) {

            return res.status(404).json({ message: "failure", error: "record not found" })

        } else {

            const decodedData = res.locals.decodedData;

            let foundUser = await User.findOne({ email: decodedData.email });

            let userVinylCollection = foundUser.vinylCollection;

            let filteredAlbumArray = userVinylCollection.filter(
                (item) => item._id.toString() !== req.params.id);

            foundUser.vinylCollection = filteredAlbumArray;

            await foundUser.save();

            res.json({ message: "success", deletedAlbum })

        }

    } catch (e) {

        const { message, statusCode } = dbErrorHelper(e);

        res.status(statusCode).json({
            message: message,
        });

    }

};

module.exports = {
    getAllAlbums,
    addToCollection,
    deleteAlbum
}