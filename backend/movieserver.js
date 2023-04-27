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
    const user = await collection.findOne({ 'user.UID': userID });
    if (!user) {
      throw new Error('User not found');
    }
    const favoriteMovies = user.favoriteMovies || [];
    favoriteMovies.push(movieID);
    await collection.updateOne(
      { 'user.UID': userID },
      { $set: { favoriteMovies } }
    );
    res.json({ message: 'Favorite movie added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add favorite movie' });
  }
});
  // Create a new user in MongoDB
  app.post('/Users', async (req, res) => {
    try {
      const { fullName, email, password } = req.body;
  
      // Connect to MongoDB
      const client = await MongoClient.connect(uri);
      const db = client.db(dbName);
  
      // Insert the new user into the "users" collection
      const result = await db.collection('Users').insertOne({
        fullName,
        email,
        password
      });
  
      // Send a success response with the new user's ID
      res.status(201).json({ id: result.insertedId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(5678); //start the server
console.log('Server is running...');