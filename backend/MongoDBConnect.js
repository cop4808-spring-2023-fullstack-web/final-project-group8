const MongoClient = require('mongodb').MongoClient;

var config = require('./config');

const uri = "mongodb+srv://" + config.db.user + ":" + config.db.pass +"@moviecluster.00ru6v3.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err)=>{
    if (err)
        console.log(err)
    else
        console.log("Connected Successfully")
})

const db = client.db('movies_db');
const moviesCollection = db.collection('Movies');

module.exports = client;
