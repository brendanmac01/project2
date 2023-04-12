const express = require("express")
const mongoose = require("mongoose")
const methodOverride = require("method-override")
require('dotenv').config()
const app = express()
const Show = require('./models/shows')

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

// INDUCES
// INDEX
app.get('/shows', async (req, res) => {
	const allShows = await Show.find({})
    res.render('index.ejs', {
        shows: allShows
    }
    );
}); 

// New
app.get('/shows/new', (req, res) => {
    res.render('new.ejs')
})

// DELETE
app.delete('/shows/:id', async (req, res) => {
    await Show.findByIdAndRemove(req.params.id,
    )
    res.redirect('/shows')
})
// U is for UPDATE
app.put("/shows/:id", async (req, res) => {
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
app.post('/shows', (req,res) => {
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
app.get("/shows/:id/edit", async (req, res) => {
    let foundShow = await Show.findById(req.params.id)
      res.render("edit.ejs", {
        show: foundShow,
      })
    })
// Show
app.get('/shows/:id', async (req, res) => {
	const foundShow = await Show.findById(req.params.id).exec()
    res.render('show.ejs', {
        show: foundShow,
    });
}); 


    





// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));