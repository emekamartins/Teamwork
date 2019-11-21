
const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test'

const connectionString = isTest ? `postgres://${ELEPHANTDB_USER}:${ELEPHANTDB_PASS}@${ELEPHANTDB_HOST}:${ELEPHANTDB_PORT}/${ELEPHANTDB_DATABASE}` :  `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
});


module.exports = pool;


// const { Client } = require('pg');

// const client = new Client({
//     user: "postgres",
//     password: 'westcrew10',
//     host: "localhost",
//     port: 5432,
//     database: "db_teamwork"
// })

// client.connect()
// .then(() => console.log("connected Successfully"))
// .catch((err) => console.log(err))
// .finally(() => client.end())
