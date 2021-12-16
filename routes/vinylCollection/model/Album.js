const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema(

    {
        albumName: {
            type: String
        },

        albumId: {
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

        albumCover: {
            type: String
        },

        albumLabel: {
            type: Array
        },

        albumTracklist: {
            type: Array
        },

        albumCondition: {
            type: String
        },

        albumDescription: {
            type: String
        },

        albumGenre: {
            type: Array
        },

        albumNotes: {
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