require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();
// const Show = require('./models/shows');
const session = require('express-session');
const bcrypt = require('bcrypt');
const hashedString = bcrypt.hashSync('yourStringHere', bcrypt.genSaltSync(10));
// const MONGODB_URI = process.env.MONGODB_URI;


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
app.use(express.static('public'));

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
// Routes / Controllers
// app.get('/hashed', (req, res) => {
//     const hashedString = bcrypt.hashSync('example', bcrypt.genSaltSync(10));
//     res.send(hashedString);
// })
// app.get('/any', (req, res) => {
//     req.session.anyProperty = 'any value';
//     res.send('This is the route that sets the value of req.session.anyProperty');
// });
// app.get('/retrieve', (req, res) => {
//     if (req.session.anyProperty === 'something you want it to') {
//         //test to see if that value exists
//         //do something if it's a match
//         res.send('it matches! cool');
//     } else {
//         //do something else if it's not
//         res.send('nope, not a match');
//     }
// });
// app.get('/update', (req, res) => {
//     req.session.anyProperty = 'something you want it to';
//     res.send('This is the route that updates req.session.anyProperty');
// });
// app.get('/destroy', (req, res) => {
//     req.session.destroy((error) => {
//         if (error) {
//             res.send(error);
//         } else {
//             res.send({
//                 success: true
//             });
//         }
//     });
// });
// INDUCES
app.get('/', async (req, res) => {
	// const allShows = await Show.find({})
    res.render('home.ejs');
}); 
// // INDEX
// app.get('/shows', async (req, res) => {
// 	const allShows = await Show.find({})
//     res.render('index.ejs', {
//         shows: allShows
//     }
//     );
// }); 

// // New
// app.get('/shows/new', (req, res) => {
//     res.render('new.ejs')
// })

// // DELETE
// app.delete('/shows/:id', async (req, res) => {
//     await Show.findByIdAndRemove(req.params.id,
//     )
//     res.redirect('/shows')
// })
// // U is for UPDATE
// app.put("/shows/:id", async (req, res) => {
//     //If checked, req.body.completed is set to 'on'
    
//     if (req.body.completed === "on") {
//       req.body.completed = true
//     } else {
//       req.body.completed = false
//     }
    
//     //Await the update since this method is slower than our page redirect.
//     await Show.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         {
//           new: true,
//         }
       
//       )
//       res.redirect(`/shows/${req.params.id}`)

//   })
//   // C is for CREATE
// app.post('/shows', (req,res) => {
//     if (req.body.completed === 'on') {
// 		//if checked, req.body.completed is set to 'on'
// 		req.body.completed = true;
// 	} else {
// 		//if not checked, req.body.completed is undefined
// 		req.body.completed = false;
// 	}
//     const createdShow = new Show(req.body)
//     createdShow.save().then(res.redirect('/shows'))
    
// })
// // EDIT PAGE!!!!
// app.get("/shows/:id/edit", async (req, res) => {
//     let foundShow = await Show.findById(req.params.id)
//       res.render("edit.ejs", {
//         show: foundShow,
//       })
//     })
// // Show
// app.get('/shows/:id', async (req, res) => {
// 	const foundShow = await Show.findById(req.params.id).exec()
//     res.render('show.ejs', {
//         show: foundShow,
//     });
// }); 


    





// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));