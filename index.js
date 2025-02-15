// const express = require("express");

// const { connectToMongoDB } = require("./connect");
// const urlRoute = require("./routes/url");
// const URL = require("./models/url");

// const app = express();
// const PORT = 8001;

// connectToMongoDB("mongodb://localhost:27017/short-url")
//     .then(() => console.log("MongoDB connected"));

// app.use(express.json());
// app.use("/url", urlRoute);

// app.get("/:shortId", async (req, res) => {
//     const shortId = req.params.shortId;

//     try {
//         const entry = await URL.findOneAndUpdate(
//             { shortId },
//             {
//                 $push: {
//                     visitHistory: {
//                         timestamp: new Date().toLocaleTimeString("en-US", {
//                             hour: "2-digit",
//                             minute: "2-digit",
//                             second: "2-digit",
//                             hour12: false, // 24-hour format
//                         }),
//                     },
//                 },
//             },
//             { new: true }
//         );

//         if (!entry) {
//             return res.status(404).json({ error: "Short URL not found" });
//         }

//         res.redirect(entry.redirectURL);
//     } catch (error) {
//         console.error("Error fetching short URL:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

const express = require("express");
const moment = require("moment"); // Import moment.js
const path = require("path");

const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
app.use(express.json());

app.set("view engine","ejs")
app.set("views", path.resolve("./views"))

app.use("/test",async(req,res)=>{
    const allUrls = await URL.find({});
    return res.render("home",{
        url:allUrls
    }
       
    )
    
})
app.use("/url", urlRoute);

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

