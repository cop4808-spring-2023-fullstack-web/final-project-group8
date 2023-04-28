require('dotenv').config()

const config = {
  server: {
    port: process.env.SERVER_PORT
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
    collection: process.env.DB_COLLECTION
  }
}

//MongoDB Credentials
config.db.host = 'moviecluster.00ru6v3.mongodb.net';
config.db.port = 80;
config.db.user = 'fali2020';
config.db.pass = 'IUHhBiOZlUed25US'
config.db.name = 'MovieDB'
config.db.collection = 'UserFavorites';
//config.api.key = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmIwMGE1MjkwZjIzMmIwNTk0OGQzN2U3NWFlN2E3NiIsInN1YiI6IjY0MzRjZWRkYTZkZGNiMDBiNmQ0NDIxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9t0GkIoFI6yEZ8RFGjf_LRxenvQTvvL4wLlwqhj9bb0";
module.exports = config;