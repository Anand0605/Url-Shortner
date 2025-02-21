// const sessionIdToUserMap = new Map();          /*Stateful Authentication*/

// function setUser (id,user){
//     sessionIdToUserMap.set(id,user);
// }
// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }

// module.exports = {setUser,getUser}

const jwt = require("jsonwebtoken");    /*Stateless Authentication*/
const secret = "Anand@123#";  // Ensuring the same secret key is used for signing and verifying

function setUser(user) {   /*Create token*/
    return jwt.sign(
        { _id: user._id, email: user.email }, // Payload containing user data
        secret, // Secret key for signing the token
        { expiresIn: "1h" } // Token expiration time of 1 hour
    );
}

function getUser(token) {
    if (!token) return null; // If no token is provided, return null

    try {
        return jwt.verify(token, secret); // Verify the token using the correct secret key
    } catch (error) {
        console.error("JWT verification error:", error.message);
        return null; // Return null if verification fails
    }
}

module.exports = { setUser, getUser };
