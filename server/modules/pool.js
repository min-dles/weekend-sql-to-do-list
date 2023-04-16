// Boilerplate for POOL & require pg dependency: 
const pg = require('pg');

// this will send POOL objects: 
const Pool = pg.Pool;

// the POOL objects are connected to Database
// Database named weekend-to-do-app is running localhost:5432
const pool = new Pool ({
    host: 'localhost',
    port: 5432,
    database: 'weekend-to-do-app'
});

// console message when connected:
pool.on('connect', () => {
    console.log('This is Pool, connected to your Postrgres database');
});

// console message when error: 
pool.on('error', (error) => {
    console.log('There is an error with the Pool:', error);
});

// Export database to router and server:
module.exports = pool;