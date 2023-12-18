const express = require('express')
const path = require('path')

const app = express();
const PORT = 8000;

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))


app.use('/',(req,res) =>{
    res.render('Home')
})
app.listen(PORT, () =>
    console.log(`Server started at PORT:${PORT}`)
);