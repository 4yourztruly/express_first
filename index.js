// import database
const dbDriver = require('better-sqlite3');
// connect to db
const db = dbDriver('bands.sqlite3');

//import express 
const express = require('express');
// create express app
const app = express();

//express setup
//serve a static frontend
app.use(express.static('frontend'));
//tell express to use json
app.use(express.json());

//rest API ROUTES
app.get('/bands', (req, res) =>{

    //req = request
    //res = response
    
    const bands = db.prepare('SELECT * FROM bands').all();

    //send them back to json
    res.json(bands);
})



//start the server
app.listen(3000, () => {
            console.log('Server started on port 3000');

});

app.get('/bands/:id', (req, res) => {

    //get url id
    const id = req.params.id;

    let statement = db.prepare('SELECT * FROM bands WHERE id = :id');
    let result = statement.all({

        id 
    });

    //send back band or error
    res.json(result[0]|| {'Error': 'No band matching id'});
});