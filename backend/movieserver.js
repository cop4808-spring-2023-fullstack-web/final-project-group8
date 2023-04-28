const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router()
const corsOptions ={
  origin:'http://localhost:3000',
  credentials:true,
  optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('./public'));

const MongoClient = require('mongodb').MongoClient;

var config = require('./config');
const client = require('./MongoDBConnect')
const database = client.db(config.db.name)
const collection = database.collection(config.db.collection)

var http = require("https");

app.post('/AddUser', async (req, res) => {
  try{
    const newUser = req.body;
    const result = await collection.insertOne(newUser);
    res.json({ UserID: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to Create User' });
  }
});

app.post('/AddFavorite', async (req, res) => {
  try {
    const userID = req.body.userID;
    const movieID = req.body.movieID;
    const user = await collection.findOne({ 'user.firebaseUID': userID });
    if (!user) {
      throw new Error('User not found');
    }
    const favoriteMovies = user.favoriteMovies || [];
    if (favoriteMovies.includes(movieID)) { // Checking For Duplicates before adding
      return res.status(400).json({ error: 'Movie already in favorites list' });
    }
    favoriteMovies.push(movieID); // Push Movie
    await collection.updateOne(
      { 'user.firebaseUID': userID },
      { $set: { favoriteMovies } } // Update the Favorite List
    );
    res.json({ message: 'Favorite movie added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add favorite movie' });
  }
});

app.post('/DeleteFavorite', async (req, res) => {
  try {
    const userID = req.body.userID;
    const movieID = req.body.movieID;
    const user = await collection.findOne({ 'user.firebaseUID': userID });
    if (!user) {
      throw new Error('User not found');
    }
    const favoriteMovies = user.favoriteMovies || []; // UserFavorites or Empty Array
    const movieIndex = favoriteMovies.indexOf(movieID); // Finds Index of the Movie ID to be Deleted
    if (movieIndex === -1) { // -1 = Not Found
      throw new Error('Movie does not exist');
    }
    favoriteMovies.splice(movieIndex, 1); //Takes Index of movie and splices(deletes) the movie (Start, Howmany)
    await collection.updateOne(
      { 'user.firebaseUID': userID },
      { $set: { favoriteMovies } }
    );
    res.json({ message: 'Favorite movie added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add favorite movie' });
  }
});

app.listen(5678); //start the server
console.log('Server is running...');