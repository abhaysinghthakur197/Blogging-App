const {Router} = require('express')

const router = Router();
const User = require('../models/user')

router.get("/signin", (req,res) => {
    return res.render("signin");
})

router.get("/signup", (req,res) => {
    return res.render("signup");
})

// logout route
router.get("/logout", (req,res) => {
    res.clearCookie("token").redirect("/");
});
// **** //

router.post("/signin", async (req,res) => {
    const {email,password} = req.body;
    // const userMatch = await User.matchPassword(email, password);

    // using try catch to encounter some error
    try {
        // token generating for user
        const token =  await User.matchPasswordandGenerateToken(email,password);
        // *** //
        // console.log("Token",token);
        return res.cookie("token",token).redirect("/");
    }catch(error) {
        return res.render("signin", {
            error: "Incorrect Password or email"
        })
    }

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