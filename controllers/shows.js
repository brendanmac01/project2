const express = require("express")
const router = express.Router()
const Show = require('../models/shows')

// INDEX
router.get('/', async (req, res) => {
	const allShows = await Show.find({})
    res.render('shows/index.ejs', {
        shows: allShows
    }
    );
}); 

// New
router.get('/new', (req, res) => {
    res.render('shows/new.ejs')
})

// DELETE
router.delete('/:id', async (req, res) => {
    await Show.findByIdAndRemove(req.params.id,
    )
    res.redirect('/shows')
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
    await Show.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
       
      )
      res.redirect(`/shows/${req.params.id}`)

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
    const createdShow = new Show(req.body)
    createdShow.save().then(res.redirect('/shows'))
    
})
// EDIT PAGE!!!!
router.get("/:id/edit", async (req, res) => {
    const foundShow = await Show.findById(req.params.id)
      res.render("shows/edit.ejs", {
        show: foundShow,
      })
    })
// Show
router.get('/:id', async (req, res) => {
	const foundShow = await Show.findById(req.params.id).exec()
    res.render('shows/show.ejs', {
        show: foundShow,
    });
}); 

module.exports = router;