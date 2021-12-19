const WishAlbum = require('../model/WishAlbum');
const dbErrorHelper = require("../../lib/dbErrorHelper/dbErrorHelper");

async function getAllWishlist(req, res) {

    let userWishlistArray = await req.user.wishlist;
    const userWishlist = await WishAlbum.find({ '_id': { $in: userWishlistArray } });
    
    res.json({ message: "success", userWishlist })
};

async function addToWishlist(req, res) {

    try {

        let foundUser = req.user;

        const {
            albumName,
            albumCover,
            albumId,
            albumArtist,
            albumYear,
            albumCountry,
            albumLabel,
            albumTracklist,
            albumCondition,
            albumDescription,
            albumGenre,
            albumNotes,
        } = req.body;

        const newAlbum = new WishAlbum({
            albumName,
            albumCover,
            albumId,
            albumArtist,
            albumYear,
            albumCountry,
            albumLabel,
            albumTracklist,
            albumCondition,
            albumDescription,
            albumGenre,
            albumNotes,

            userID: foundUser._id
        })

        let savedAlbum = await newAlbum.save();

        foundUser.wishlist.push(savedAlbum._id);
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

        let deletedAlbum = await WishAlbum.findByIdAndRemove(req.params.id);

        if (!deletedAlbum) {

            return res.status(404).json({ message: "failure", error: "record not found" })

        } else {


            let foundUser = req.user

            let userWishlist = foundUser.wishlist;

            let filteredWishlistArray = userWishlist.filter(
                (item) => item._id.toString() !== req.params.id);

            foundUser.userWishlist = filteredWishlistArray;

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

async function findAlbum(req, res) {

    try {

        let foundAlbum = await WishAlbum.findById(req.params.id);

        if (!foundAlbum) {

            res.status(404).json({ message: "failure", error: "WishAlbum not found" });

        } else {

            res.json({ message: "success", payload: foundAlbum })
        }

    } catch (e) {

        res.status(500).json(errorHandler(e));
    }
}

module.exports = {
    addToWishlist,
    deleteAlbum,
    getAllWishlist,
    findAlbum
}