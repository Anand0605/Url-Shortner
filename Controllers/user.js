const {v4:uuidv4} = require("uuid")
const  User = require("../models/user");
const {setUser} = require("../service/auth")

async function handleUserSignup(req, res){
    const { name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    })
    return res.render("/")
}
async function handleUserLogin(req, res){
    const {  email, password} = req.body;
    const user = await User.findOne({email, password});
    if(!user)
        return res.render("login",{error:"invalid username and password"})

    // const sessionId = uuidv4()      /* statefull Authentication*/
    // setUser(sessionId,user)
    // res.cookie("uuid",sessionId)
    const token = setUser(user)         /*stateless Authentication*/
    res.cookie("uuid",token)

    return res.redirect("/")
}

module.exports={handleUserSignup,handleUserLogin}