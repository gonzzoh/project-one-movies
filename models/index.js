/* -------------------------------------------------------------------------- */
/*                              Required Modules                              */
/* -------------------------------------------------------------------------- */
const mongoose = require('mongoose');
/* ------------------------ Create connection string ------------------------ */
const connectionString = 'mongodb://localhost:27017/moviedb';
/* ------------------ connect and hide deprecation warnings ----------------- */
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    });
/* --------------- Listen for connection and callback function -------------- */
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${connectionString} 🥭`);
});

/* --------------------------- Export data modules -------------------------- */
module.exports = {
    Movies: require('./Movies.js')
    }
    