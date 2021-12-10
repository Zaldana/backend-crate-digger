const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema(

    {
        albumName: {
            type: String
        },

        albumCover: {
            type: String
        },

        albumThumb: {
            type: String
        },

        albumID: {
            type: String
        },

        albumArtist: {
            type: String
        },

        albumYear: {
            type: Number
        },

        albumCountry: {
            type: String
        },

        albumLabel: {
            type: String
        },

        albumTracklist: {
            type: Array
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