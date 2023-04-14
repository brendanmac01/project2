require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();
const session = require('express-session');
// const bcrypt = require('bcrypt');
// const hashedString = bcrypt.hashSync('yourStringHere', bcrypt.genSaltSync(10));

// const show = { watched: true };
// const watchedSymbol = show.watched ? '<i class="fas fa-check"></i>' : '<i class="fas fa-times"></i>';
// console.log(watchedSymbol); // outputs '<i class="fas fa-check"></i>'

// MONGOOSE
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

//Middlewares

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use('/public', express.static('public'));

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
);

//CONTROLLERS
const showsController = require('./controllers/shows.js');
app.use('/shows', showsController)
const moviesController = require('./controllers/movies.js');
app.use('/movies', moviesController)
// const userController = require('./controllers/users.js');
// app.use('/users', userController)

app.get('/', async (req, res) => {
	// const allShows = await Show.find({})
    res.render('homepage.ejs');
}); 

app.get('/watchlist', async (req, res) => {
    res.render('home.ejs');
})
// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));