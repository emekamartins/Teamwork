
const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';


const connectionString = 'postgres://yzozlqfxfehyww:5b17c81a9689c1dfbd0e10e25263cdeb278e38d76b8458cffb17551cdcf149e0@ec2-23-23-245-89.compute-1.amazonaws.com:5432/d8h48eej0cd637';


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
