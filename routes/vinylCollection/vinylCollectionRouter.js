var express = require('express');
var router = express.Router();
var passport = require('passport')

const {
    getAllCollection,
    addToCollection,
    deleteAlbum,
    updateAlbum,
    findAlbum
} = require("./controller/vinylCollectionController");

router.get(
    "/",
    passport.authenticate("jwt-user", { session: false }),
    getAllCollection
);

router.get(
    "/find-by-id/:id",
    passport.authenticate("jwt-user", { session: false }),
    findAlbum
);

router.post(
    "/add",
    passport.authenticate("jwt-user", { session: false }),
    addToCollection
);

router.put(
    "/update-album-by-id/:id",
    passport.authenticate("jwt-user", { session: false }),
    updateAlbum
);

router.delete(
    "/delete-album-by-id/:id",
    passport.authenticate("jwt-user", { session: false }),
    deleteAlbum
);

module.exports = router;