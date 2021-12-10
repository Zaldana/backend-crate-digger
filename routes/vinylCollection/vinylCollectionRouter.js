var express = require('express');
var router = express.Router();
var passport = require('passport')

const {
    getAllCollection,
    addToCollection,
    deleteAlbum,
} = require("./controller/vinylCollectionController");

router.get(
    "/",
    passport.authenticate("jwt-user", { session: false }),
    getAllCollectionf
);

router.post(
    "/add",
    passport.authenticate("jwt-user", { session: false }),
    addToCollection
);

router.delete(
    "/delete-album-by-id/:id",
    passport.authenticate("jwt-user", { session: false }),
    deleteAlbum
);

module.exports = router;