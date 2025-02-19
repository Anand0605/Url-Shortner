const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
    console.log("Cookies Received:", req.cookies); // ✅ Debugging Cookies
    const userUid = req.cookies?.uuid; // ✅ Corrected key (uuid)

    if (!userUid) {
        console.log("No UUID found, redirecting to login...");
        return res.redirect("/login");
    }

    const user = getUser(userUid);

    if (!user) {
        console.log("Invalid UUID, user not found, redirecting to login...");
        return res.redirect("/login");
    }

    req.user = user;
    next();
}

// ✅ Define `checkAuth` outside the function
async function checkAuth(req, res, next) {
    console.log("Cookies Received:", req.cookies); // ✅ Debugging Cookies
    const userUid = req.cookies?.uuid; // ✅ Corrected key (uuid)
    const user = getUser(userUid);

    req.user = user;
    next();
}

module.exports = { restrictToLoggedinUserOnly, checkAuth };
