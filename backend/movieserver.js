const express = require('express')
const app = express()
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
    const user = await collection.findOne({ 'user._id': userID });
    if (!user) {
      throw new Error('User not found');
    }
    const favoriteMovies = user.favoriteMovies || [];
    favoriteMovies.push(movieID);
    await collection.updateOne(
      { 'user._id': userID },
      { $set: { favoriteMovies } }
    );
    res.json({ message: 'Favorite movie added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add favorite movie' });
  }
});

app.post('/RemoveFavorite', async (req, res) => {
  try {
    const userID = req.body.userID;
    const movieID = req.body.movieID;
    const user = await collection.findOne({ 'user._id': userID });
    if (!user) {
      throw new Error('User not found');
    }
    const favoriteMovies = user.favoriteMovies || [];
    const movieIndex = favoriteMovies.indexOf(movieID);
    if (movieIndex === -1) {
      throw new Error('Movie not found in favorites');
    }
    favoriteMovies.splice(movieIndex, 1);
    await collection.updateOne(
      { 'user._id': userID },
      { $set: { favoriteMovies } }
    );
    res.json({ message: 'Favorite movie removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove favorite movie' });
  }
});

app.get('/FavoriteMovies/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;
    const user = await collection.findOne({ 'user._id': userID });
    if (!user) {
      throw new Error('User not found');
    }
    const favoriteMovies = user.favoriteMovies || [];
    res.json({ favoriteMovies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get favorite movies' });
  }
});




  
app.listen(5678); //start the server
console.log('Server is running...');