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

// Rendering blog in home page
const Blog = require("./models/blog")
//  *** //

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


// middleware start -> 

// To work with form data 
app.use(express.urlencoded({ extended: false }))
// *** //

// To work with cookie
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
//  ***** //

// To show the image in home page because express thick /blog/blog._id is a route
app.use(express.static(path.resolve("./public")));
// ****//

// Middleware End *** //


app.get('/', async(req, res) => {
    // adding blog to show in home page
    const allBlogs = await Blog.find({})
    // **** //
    res.render('Home', {
        user: req.user,
        blogs: allBlogs
    })
})

app.use("/user", userRoute);
app.use("/blog",blogRoute);

app.listen(PORT, () =>
    console.log(`Server started at PORT:${PORT}`)
);