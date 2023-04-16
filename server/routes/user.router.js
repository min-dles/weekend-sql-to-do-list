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

// POST for user name to be entered to Database: 
userRouter.post('/', (req, res) => {
    let newUser = req.body;
    // need to tell route where to store the data (which table?)
    let sqlText = `INSERT INTO "users"
        ("name")
        VALUES ($1);`;
    let sqlValues = [newUser.name];
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            // 201 is CREATED
            res.sendStatus(201);
        }).catch(error => {
            // 500 is INTERNAL SERVER ERROR
            res.sendStatus(500);
        })
})

module.exports = userRouter;