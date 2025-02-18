const express = require("express");
const moment = require("moment"); // Import moment.js
const path = require("path");

const { connectToMongoDB } = require("./connect");

const URL = require("./models/url");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use("/test", async (req, res) => {
    const allUrls = await URL.find({});
    return res.render("home", {
        newUrl: allUrls,
    }
)
})

app.use("/url", urlRoute);
app.use("/user", userRoute)
app.use("/", staticRoute)


app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    try {
        const formattedTime = moment().format("HH:mm:ss"); // 24-hour format

        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: { visitHistory: { timestamp: formattedTime } },
            },
            { new: true }
        );

        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error fetching short URL:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

