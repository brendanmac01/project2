const express = require("express");
const router = express.Router();
const Movie = require('../models/movies');

// INDEX
router.get('/', async (req, res) => {
	const allMovies = await Movie.find({})
    res.render('movies/index.ejs', {
        movies: allMovies
    }
    );
}); 

// New
router.get('/new', (req, res) => {
    res.render('../views/movies/new.ejs')
})

// DELETE
router.delete('/:id', async (req, res) => {
    await Movie.findByIdAndRemove(req.params.id,
    )
    res.redirect('/movies')
})
// U is for UPDATE
router.put("/:id", async (req, res) => {
    //If checked, req.body.completed is set to 'on'
    
    if (req.body.completed === "on") {
      req.body.completed = true
    } else {
      req.body.completed = false
    }
    
    //Await the update since this method is slower than our page redirect.
    await Movie.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
       
      )
      res.redirect(`/movies/${req.params.id}`)

  })
  // C is for CREATE
router.post('/', (req,res) => {
    if (req.body.completed === 'on') {
		//if checked, req.body.completed is set to 'on'
		req.body.completed = true;
	} else {
		//if not checked, req.body.completed is undefined
		req.body.completed = false;
	}
    const createdMovie = new Movie(req.body)
    createdMovie.save().then(res.redirect('/movies'))
    
})
// EDIT PAGE!!!!
router.get("/:id/edit", async (req, res) => {
    const foundMovie = await Movie.findById(req.params.id)
      res.render("movies/edit.ejs", {
        movie: foundMovie,
      })
    })
// Show
router.get('/:id', async (req, res) => {
	const foundMovie = await Movie.findById(req.params.id).exec()
    res.render('movies/show.ejs', {
        movie: foundMovie,
    });
}); 

module.exports = router;