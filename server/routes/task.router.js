const express = require('express');
const taskRouter = express.Router();

// Database connection: 
const pool = require('../modules/pool.js');

// GET: 
taskRouter.get('/', (req, res) => {
    console.log('GET /task-list');

    let sqlText = `
        SELECT * FROM "tasks"
        ORDER BY "id";`;
    
    pool.query(sqlText)
        .then((dbRes) => {
            let theTasks = dbRes.rows;
            res.send(theTasks);
        })
        .catch((dbErr) => {
            console.log('SQL query in GET /task-list failed:', dbErr);
            res.sendStatus(500)
        })
})

// POST:

// PUT (to update tasks as "complete" or "in progress")

// DELETE: option for tasks to be deleted from list & removed from Database:

// export this router for connection to the server: 
module.exports = taskRouter;