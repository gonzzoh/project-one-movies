const express = require('express');
const api = process.env.apiKey
const router = express.Router();
const axios = require('axios')
let temp ={}



/* --------------------------------- search --------------------------------- */
router.get('/', (req, res) => {    
    res.render("./search/search.ejs")    
})


router.post('/', (req, res) => {
    let searchTerm = req.body.search
    const searchTitle = "https://www.omdbapi.com/?s="+searchTerm+"&apikey="+api
    console.log(searchTitle)
    axios.get(searchTitle)
    .then((data) => {
        temp = data.data.Search
        console.log(temp)
        if (data.data.Response === 'False') {
            res.send(data.data.Error)
        } else {res.redirect('/search/results')}
        
    })
})

router.get('/results', (req, res) => { 
    res.render('./search/searchResults.ejs', { searchResults:temp }) 
    
})


module.exports = router


