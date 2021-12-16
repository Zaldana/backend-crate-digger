var express = require('express');
var router = express.Router();
var passport = require('passport')

const {
  createUser,
  login,
  updateUser,
} = require("./controller/userController");

const {
  checkIsEmpty,
  checkIsUndefined,
  validateCreateData,
  validateLoginData,
  validateUpdateData
} = require("../lib/authMiddleWare");

router.get(
  '/',
  passport.authenticate("jwt-user", { session: false }),
  function (req, res, next) {
    res.send('respond with a resource');
  });

router.post(
  "/create-user",
  checkIsUndefined,
  checkIsEmpty,
  validateCreateData,
  createUser
);

router.put(
  "/edit-user",
  passport.authenticate("jwt-user", { session: false }),
  checkIsUndefined,
  checkIsEmpty,
  validateUpdateData,
  updateUser
);

router.post(
  "/login",
  checkIsUndefined,
  checkIsEmpty,
  validateLoginData,
  login
);

module.exports = router;