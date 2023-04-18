const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
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

// Manual Insert of a Favorite Movie
const newFavorite = {
  user_id:1234,
  movie_id:12345,
  title: "The Godfather",
  release_date: "1972-03-14",
  poster_path: "/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg"
};
collection.insertOne(newFavorite, function(err,res){
  if (err) throw err;
    console.log("1 Movie inserted");
    client.close();
})
  
app.listen(5678); //start the server
console.log('Server is running...');