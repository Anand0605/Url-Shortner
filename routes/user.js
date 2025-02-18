const express = require("express");
const {handleUserSignup} = require("../Controllers/user")

const router = express.Router();

router.post("/",handleUserSignup)

module.exports = router;