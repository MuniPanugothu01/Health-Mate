const express = require("express");
const router = express.Router();
const { userRegister } = require("../controllers/UserController");

router.post("/signupUser", userRegister);

module.exports = router;
