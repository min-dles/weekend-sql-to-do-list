const express = require('express');
const userRouter = express.Router();

const pool = require('../modules/pool.js');

// GET For user name to be updated (customizing client-side)
userRouter.get('/', (req, res) => {
    console.log('GET /user');

    let sqlText = `
        SELECT * FROM "users"
        ORDER BY "id";`;
    
    pool.query(sqlText)
        .then((dbRes) => {
            let theUsers = dbRes.rows;
            res.send(theUsers);
        }).catch((dbErr) => {
            console.log('SQL query in GET /user failed:', dbErr);
            res.sendStatus(500)
        })
})

module.exports = userRouter;