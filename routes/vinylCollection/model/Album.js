const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema(

    {
        albumName: {
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