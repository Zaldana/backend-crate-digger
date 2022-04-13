const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const dbErrorHelper = require("../../lib/dbErrorHelper/dbErrorHelper")
const User = require("../model/User");


async function createUser(req, res) {

    const { firstName, lastName, username, email, password } = req.body;

    try {

        let salt = await bcrypt.genSalt(10);
        let hashed = await bcrypt.hash(password, salt);

        const createdUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashed,
        });

        let savedUser = await createdUser.save();

        res.json({ message: "success", payload: savedUser });

    } catch (e) {

        const { message, statusCode } = dbErrorHelper(e);

        res.status(statusCode).json({
            message: message,
        });

    }
};

async function updateUser(req, res) {

    const { password } = req.body;

    try {

        let salt = await bcrypt.genSalt(10);
        let hashed = await bcrypt.hash(password, salt);

        req.body.password = hashed;

        let updatedUser = await User.findOneAndUpdate(
            { email: req.user.email },
            req.body,
            { new: true }
        );

        res.json({ message: "success", payload: updatedUser });

    } catch (e) {

        const { message, statusCode } = dbErrorHelper(e);

        res.status(statusCode).json({
            message: message,
        });

    }
}

async function login(req, res) {

    try {

        let foundUser = await User.findOne({ email: req.body.email }).select(
            "-__v"
        );

        if (foundUser === null) {
            throw {
                message: "User not found, please sign up",
                code: 404,
            };
        }

        let comparedPassword = await bcrypt.compare(
            req.body.password,
            foundUser.password
        );

        if (!comparedPassword) {
            throw {
                message: "Check your email and password",
                code: 401,
            };
        }

        let jwtToken = jwt.sign(
            { email: foundUser.email, username: foundUser.username },
            process.env.JWT_USER_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.json({
            jwtToken,
        });
    
    } catch (e) {
        
        const { message, statusCode } = dbErrorHelper(e);

        res.status(statusCode).json({
            message: message,
        });
    }
}

async function getUser(req, res) {

    let user = await req.user;

    res.json({ message: "success", user })

};


module.exports = {
    createUser,
    login,
    updateUser,
    getUser
};