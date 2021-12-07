const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema(

    {
        albumName: {

            type: String
        },

        albumCover: {
            type: String
        },

        albumID: {
            type: String
        },

        albumArtist: {
            type: String
        },

        albumYear: {
            type: String
        },

        albumLabel: {
            type: String
        },

        albumTracklist: {
            type: String
        },

        albumCondition: {
            type: String
        },

        userID: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
        },
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("album", AlbumSchema);