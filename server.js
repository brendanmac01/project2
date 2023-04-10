const express = require("express")
const mongoose = require("mongoose")
const methodOverride = require("method-override")
require('dotenv').config()
const app = express()
const PORT  = 3000

// MONGOOSE
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

//Middlewares

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// INDEX
app.get('/', (req, res) => {
    res.render('index.ejs', { data: Pokemon });
    });








app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})