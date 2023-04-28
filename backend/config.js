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

module.exports = config;