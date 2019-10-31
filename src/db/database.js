
const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = 'postgresql://postgres:westcrew10@localhost:5432/db_teamwork';

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
