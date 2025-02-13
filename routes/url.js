const express = require('express')
const { handleGenerateNewShortURl } = require("../Controllers/url")

const router = express.Router();

router.post("/",handleGenerateNewShortURl)

module.exports = router;