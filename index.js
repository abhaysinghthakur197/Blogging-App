const express = require('express')
const path = require('path')

// cookie parser for middleware
const cookieParser = require('cookie-parser')
//  **** //

// User Route
const userRoute = require('./routes/user')
//  *** //
// Blog Route
const blogRoute = require("./routes/blog")
// **** //

// Connect MongoDB
const { connectToMongoDB } = require('./connect')
const { checkForAuthenticationCookie } = require('./middlewares/authentication')
// *** //
const app = express();
const PORT = 8000;

// MongoDB connect
connectToMongoDB("mongodb://127.0.0.1:27017/blogging-app").then(() => console.log("Db connected")).catch((e) => console.log(e));
//  *** //

// view engine - EJS
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))
// *** //


// middleware -> 
// To work with form data 
app.use(express.urlencoded({ extended: false }))
// *** //
// To work with cookie
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
//  ***** //


app.get('/', (req, res) => {
    res.render('Home', {
        user: req.user,
    })
})

app.use("/user", userRoute);
app.use("/blog",blogRoute);

app.listen(PORT, () =>
    console.log(`Server started at PORT:${PORT}`)
);