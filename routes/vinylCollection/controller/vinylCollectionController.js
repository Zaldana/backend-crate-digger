const Album = require('../model/Album');
const User = require('../../users/model/User');
const dbErrorHelper = require("../../lib/dbErrorHelper/dbErrorHelper")

async function getAllCollection(req, res) {

    let allCollection = await Album.find({});
    res.json({ message: "success", allCollection })

};

async function addToCollection(req, res) {

    try {

        let foundUser = req.user;
        
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

async function updateAlbum(req, res) {

        try {

            let foundAlbum = await Album.findById(req.params.id);

            if (!foundAlbum) {

                res.status(404).json({ message: "failure", error: "Order not found" });

            } else {

                let updatedAlbum = await Album.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    {
                        new: true
                    }
                );

                res.json({ message: "success", payload: updatedAlbum })

            }

        } catch (e) {

            res.status(500).json(errorHandler(e));
        }

};

module.exports = {
    addToCollection,
    deleteAlbum,
    updateAlbum,
    getAllCollection,
}