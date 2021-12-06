var express = require('express');
var router = express.Router();

const {
  createUser,
  login,
  getUserInfo
} = require("./controller/userController");

const {
  checkIsEmpty,
  checkIsUndefined,
  validateCreateData,
  validateLoginData,
  // jwtMiddleware
} = require("../lib/authMiddleware");

router.get('/',
  // jwtMiddleware,
  getUserInfo
);

router.post(
  "/create-user",
  checkIsUndefined,
  checkIsEmpty,
  validateCreateData,
  createUser
);

router.put(
  "/edit-user",
  checkIsUndefined,
  checkIsEmpty,
  validateCreateData,
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