const express = require("express");
const URL = require("../models/url"); // Model import karo
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const allUrls = await URL.find({}); // MongoDB se URLs fetch karo
        res.render("home", { newUrl: allUrls, id: null }); // `newUrl` pass karo, id default null
    } catch (error) {
        console.error("Error fetching URLs:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/signup",(req, res)=>{
return res.render("signup")
})

module.exports = router;
