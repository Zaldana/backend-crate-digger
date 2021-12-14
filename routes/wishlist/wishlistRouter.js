var express = require('express');
var router = express.Router();
var passport = require('passport')

const {
    getAllWishlist,
    addToWishlist,
    deleteAlbum,
    findAlbum
} = require("../wishlist/controller/wishlistController");

router.get(
    "/",
    passport.authenticate("jwt-user", { session: false }),
    getAllWishlist
);

router.get(
    "/find-by-id",
    passport.authenticate("jwt-user", { session: false }),
    findAlbum
);

router.post(
    "/add",
    passport.authenticate("jwt-user", { session: false }),
    addToWishlist
);

router.delete(
    "/delete-album-by-id/:id",
    passport.authenticate("jwt-user", { session: false }),
    deleteAlbum
);

module.exports = router;