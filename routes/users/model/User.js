const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },

        lastName: {
            type: String,
        },

        username: {
            type: String,
            unique: true,
        },

        email: {
            type: String,
            unique: true,
        },

        password: {
            type: String,
        },

        vinylCollection: [{ type: mongoose.Schema.ObjectId, ref: "vinyl-collection" }],

        wishlist: [{ type: mongoose.Schema.ObjectId, ref: "wishlist" }]

    },

    {
        timestamps: true,
    }
);

module.exports = mongoose.model("user", userSchema);