const express = require('express')
const path = require('path')

// User Route
const userRoute = require('./routes/user')
//  *** //

// Connect MongoDB
const { connectToMongoDB } = require('./connect')
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
app.use(express.urlencoded({extended: false}))
// *** //


app.get('/',(req,res) =>{
    res.render('Home')
})

app.use("/user",userRoute);

app.listen(PORT, () =>
    console.log(`Server started at PORT:${PORT}`)
);