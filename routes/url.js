const express = require('express')
const { handleGenerateNewShortURl,handleGetAnalytics } = require("../Controllers/url")

const router = express.Router();



router.post("/",handleGenerateNewShortURl)
router.get('/analytics/:shortId',handleGetAnalytics)

module.exports = router;