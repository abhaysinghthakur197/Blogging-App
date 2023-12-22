const {Router} = require('express')

const router = Router();
const User = require('../models/user')

router.get("/signin", (req,res) => {
    return res.render("signin");
})

router.get("/signup", (req,res) => {
    return res.render("signup");
})

router.post("/signin", async (req,res) => {
    const {email,password} = req.body;
    const userMatch = await User.matchPassword(email, password);

    console.log("User",userMatch);
    return res.redirect("/");
});

router.post("/signup",  async (req,res) => {
    const {username, email, password}  = req.body;
  
    await User.create({
        username,
        email,
        password
    });

    return res.redirect("/");
});



module.exports = router;