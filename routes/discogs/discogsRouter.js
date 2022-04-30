var express = require('express');
var router = express.Router();
var passport = require('passport')

const {
    getAlbum,
    getArtist,
    getArtistDetails
} = require("../discogs/controller/discogsController");

router.get(
    "/get-album:album",
    passport.authenticate("jwt-user", { session: false }),
    getAlbum
);

router.get(
    "/get-artist:artist",
    passport.authenticate("jwt-user", { session: false }),
    getArtist
);

router.get(
    "/artist-details:artistDetails",
    passport.authenticate("jwt-user", { session: false }),
    getArtistDetails
);

module.exports = router;