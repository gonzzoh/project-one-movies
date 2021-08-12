/* -------------------------------------------------------------------------- */
/*                              Required Modules                              */
/* -------------------------------------------------------------------------- */
const express = require('express');
const db = require('../models/index.js')
const router = express.Router();

const api = process.env.apiKey
const axios = require('axios')



/* ---------------------------------- index --------------------------------- */
router.get('/', (req, res) => { 
    db.Movies.find({}, (err, allMovies) => { 
        if(err){return console.log(err)}
        else{
            res.render('./movies/index.ejs', { allMovies: allMovies }) 
        }    
    })
})
/* ----------------------------------- new ---------------------------------- */
router.get('/new', (req, res) => { //get url path
    res.render('./movies/new.ejs') //render our new page
  }) 
/* --------------------------------- create --------------------------------- */
router.post('/', (req, res) => { 

  let searchTerm = req.body.Title
  const searchTitle = "https://www.omdbapi.com/?t="+searchTerm+"&apikey="+api
  axios.get(searchTitle)
  .then((data) => {
      let temp = data.data
      db.Movies.findOne({imdbID: temp.imdbID},(err,foundMovie)=>{
        if(err) return console.log(err)
        if(foundMovie){
            res.send("this already exists")
        }
        else{
          db.Movies.create(temp,(err,createdMovie)=>{
            if(err) return console.log(err)
              // res.send('created movie')
              res.redirect('/movies')
          })
        }
      })      
  }).catch((err)=>{
    console.log("this is error")
    console.log(err)
  })
})
/* ---------------------------------- show ---------------------------------- */
router.get('/:dataId', (req, res) => { // grab id from url
    db.Movies.findById(req.params.dataId, (err, foundMovie) => { //find obj with unique Id from database
      if(err) return console.log(err);
      res.render('./movies/show.ejs', { oneMovie: foundMovie }) //pass that obj to our show.ejs page and render it
    })  
  })
  
/* ---------------------------------- edit ---------------------------------- */
// Serves a form to get info to update with
router.get('/:dataId/edit', (req, res) => { //get id from url
    db.Movies.findById(req.params.dataId, (err, foundMovie) => { //find item in DB with id
      if(err) return console.log(err);
      res.render('./movies/edit.ejs', { oneMovie: foundMovie }); //render our edit page and pass the found item to it.
    })
  });
  
/* --------------------------------- update --------------------------------- */
// Update the data for a particular item
router.put('/:dataId', (req, res) => {
    db.Movies.findByIdAndUpdate(req.params.dataId, req.body, (err, updatedMovie) => {
    if(err) return console.log(err);
    res.redirect(`/movies/${req.params.dataId}`)
  })
})
/* --------------------------------- destroy -------------------------------- */
router.delete('/:dataId', (req, res) => { //grab id from url
    db.Movies.findByIdAndDelete(req.params.dataId, (err) => { //delete item from database with specified id
      if(err) return console.log(err);
      res.redirect('/movies'); //redirect to index page
    })
  })

/* --------------------------------- Export --------------------------------- */
module.exports = router;
