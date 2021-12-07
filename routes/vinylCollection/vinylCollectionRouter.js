var express = require('express');
var router = express.Router();
var passport = require('passport')

// const {
//     jwtMiddleware
// } = require("../lib/authMiddleware");

const {
    getAllAlbums,
    addToCollection,
    deleteAlbum
} = require("./controller/vinylCollectionController");

// router.get(
//     '/',
//     passport.authenticate("jwt-user", { session: false }),
//     function (req, res, next) {
//         res.send('respond with a resource');
//     });

router.get('/', jwtMiddleware, getAllAlbums);

router.post("/add-album", jwtMiddleware, addToCollection);

router.delete("/delete-album-by-id/:id", jwtMiddleware, deleteAlbum);

module.exports = router;