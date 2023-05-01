const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

const corsOptions ={
  origin:'http://localhost:3000',
  credentials:true,
  optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const MongoClient = require('mongodb').MongoClient;

var config = require('./config');
const client = require('./MongoDBConnect')
const database = client.db(config.db.name)
const collection = database.collection(config.db.collection)

var http = require("https");

/**
 * Description: Handles the HTTP POST request to add a new user to the MongoDB collection.
 * 
 * @function
 * @name addUser
 * @method POST /addUser
 * @param {string} user - Description of the parameter.
 * @returns {void} 
 * @throws {Error} If failed to create user due to internal server error.
 * @example
 * // Example response if user is successfully added to the collection
 * // Status code: 200 OK
 * {
 *   "UserID": "61542c9e7d9b35e4b8c01c16"
 * }
 *
 * // Example response if user already exists in the collection
 * // Status code: 200 OK
 * {
 *   "message": "User Already Exists in MongoDB"
 * }
 *
 * // Example response if there was an internal server error
 * // Status code: 500 Internal Server Error
 * {
 *   "error": "Failed to Create User"
 * }
 */ 
app.post('/AddUser', async (req, res) => {
  try{
    const userCheck = req.body.user; //Inside user object of response
    const userID = userCheck.firebaseUID; //get firebaseUID for Search
    const userExist = await collection.findOne({ 'user.firebaseUID': userID});
    if(!userExist){ //if User Exists Via FirebaseUID
      const newUser = req.body; //Object waiting to be inserted to mongo
      const result = await collection.insertOne(newUser); // User did not exist so we add.
      res.json({ UserID: result.insertedId });
    } else {
      console.log('User with ID ${userID} already exists');
      res.json({ message: 'User Already Exists in MongoDB' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to Create User' });
  }
});

/**
 * Description: Adds a new favorite movie for the given user to the MongoDB collection.
 *
 * @function
 * @name addFavorite
 * @method POST /AddFavorite
 * @param {string} userID - The Firebase UID of the user.
 * @param {string} movieID - The ID of the movie to add to favorites.
 * @throws {Error} If the user is not found in the collection or if there was an internal server error.
 * @returns {void}
 * @example
 * // Example request body
 * // {
 * //   "userID": "KQOaOY8yvNcY9X7VxgmjKUW7Zv32",
 * //   "movieID": "tt1375666"
 * // }
 *
 * // Example response if movie is successfully added to favorites
 * // Status code: 200 OK
 * {
 *   "message": "Favorite movie added successfully"
 * }
 *
 * // Example response if the movie is already in the user's favorites list
 * // Status code: 200 OK
 * {
 *   "error": "Movie already in favorites list"
 * }
 *
 * // Example response if user is not found in the collection
 * // Status code: 404 Not Found
 * {
 *   "error": "User not found"
 * }
 *
 * // Example response if there was an internal server error
 * // Status code: 500 Internal Server Error
 * {
 *   "error": "Failed to add favorite movie"
 * }
 */
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
      return res.json({ error: 'Movie already in favorites list' });
    }
    favoriteMovies.push(movieID); // Push Movie
    await collection.updateOne(
      { 'user.firebaseUID': userID },
      { $set: { favoriteMovies } } // Update the Favorite List
    );
    res.json({ message: 'Favorite movie added successfully' });
  } catch (error) {
    console.error(error);
    res.json({ error: 'Failed to add favorite movie' });
  }
});

/**
 * Description: Removes a favorite movie from the given user's list in the MongoDB collection.
 *
 * @function
 * @name removeFavorite
 * @method POST /RemoveFavorite
 * @param {string} userID - The Firebase UID of the user.
 * @param {string} movieID - The ID of the movie to remove from favorites.
 * @throws {Error} If the user is not found in the collection, if the movie is not found in the user's favorites list, or if there was an internal server error.
 * @returns {void}
 * @example
 * // Example request body
 * // {
 * //   "userID": "KQOaOY8yvNcY9X7VxgmjKUW7Zv32",
 * //   "movieID": "tt1375666"
 * // }
 *
 * // Example response if movie is successfully removed from favorites
 * // Status code: 200 OK
 * {
 *   "message": "Favorite movie removed successfully"
 * }
 *
 * // Example response if the movie is not in the user's favorites list
 * // Status code: 404 Not Found
 * {
 *   "error": "Movie not found in favorites"
 * }
 *
 * // Example response if user is not found in the collection
 * // Status code: 404 Not Found
 * {
 *   "error": "User not found"
 * }
 *
 * // Example response if there was an internal server error
 * // Status code: 500 Internal Server Error
 * {
 *   "error": "Failed to remove favorite movie"
 * }
 */
app.post('/RemoveFavorite', async (req, res) => {
  try {
    const userID = req.body.userID;
    const movieID = req.body.movieID;
    const user = await collection.findOne({ 'user.firebaseUID': userID });
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
      { 'user.firebaseUID': userID },
      { $set: { favoriteMovies } }
    );
    res.json({ message: 'Favorite movie removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove favorite movie' });
  }
});

/**
 * Retrieves a user's favorite movies based on their userID.
 *
 * @name FavoriteMovies
 * @method GET /FavoriteMovies/:userID
 * @param {string} userID - The userID of the user whose favorite movies are to be retrieved.
 * @returns {JSON} Returns a JSON object containing an array of the user's favorite movies.
 * @throws {Error} Throws an error if the specified user does not exist in the database or if there was an issue retrieving the user's favorite movies from the database
 * 
 *
 * @example
 * // Example usage:
 * // GET /FavoriteMovies/1234567890
 * // Returns:
 * // { 
 * //   "favoriteMovies": [
 * //      "movieID1",
 * //      "movieID2",
 * //      "movieID3"
 * //   ]
 * // }
 */
app.get('/FavoriteMovies/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;
    const user = await collection.findOne({ 'user.firebaseUID': userID });
    console.dir(userID)
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

/**
 * Description: Search for a movie based on a query 
 *
 * @function
 * @name searchMovies
 * @method GET /search
 * @param {Type} paramName - Description of the parameter.
 * @returns {Type} Description of the return value.
 * @throws {Type} Description of the exception thrown.
 */
app.get('/search', async (req, res) => {
  const query = req.query.query;
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`);
    res.json({ movies: response.data.results });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
})
const port = config.server.port;
app.listen(port); //start the server
console.log('Server is running...');