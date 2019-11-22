
const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

console.log(isProduction)
const connectionString = `postgres://${process.env.ELEPHANTDB_USER}:${process.env.ELEPHANTDB_PASS}@${process.env.ELEPHANTDB_HOST}:5432/${process.env.ELEPHANTDB_DATABASE}`;


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
