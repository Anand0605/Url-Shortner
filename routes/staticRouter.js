const express = require("express");
const URL = require("../models/url"); // Model import karo
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        if(!req.user) return res.redirect('/login')
        const allUrls = await URL.find({createdBy:req.user._id}); // MongoDB se URLs fetch karo
        res.render("home", { newUrl: allUrls, id: null }); // `newUrl` pass karo, id default null
    } catch (error) {
        console.error("Error fetching URLs:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/signup",(req, res)=>{
return res.render("signup")
})
router.get("/login",(req, res)=>{
    return res.render("login")
    })

module.exports = router;
