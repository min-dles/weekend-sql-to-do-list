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
            // 500 is Internal Server Error
            res.sendStatus(500)
        })
})

// POST:
taskRouter.post('/', (req, res) => {
    let newTask = req.body;
    let sqlText = `INSERT INTO "tasks"
        ("task", "status")
        VALUES
        ($1, 'false');`;
    // is it .task or .taskNotes per the ID set in index.html on input field?
    let sqlValues = [newTask.task];
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            // status message: created
            res.sendStatus(201);
        }).catch(error => {
            // status message: internal server error
            res.sendStatus(500);
        })
})

// PUT (to update tasks as "complete" or "in progress")
taskRouter.put('/:id', (req, res) => {
    //req.params should look like: { id: '3' }
    let idToUpdate = req.params.id;
    let statusUpdate = req.body.status;
    let sqlText = `
        UPDATE "tasks"
            SET "status"=$1
            WHERE "id"=$2;`;
    let sqlValues = [statusUpdate, idToUpdate];
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(200);
        }).catch((dbErr) => {
            res.sendStatus(500);
        })
})

// DELETE: option for tasks to be deleted from list & removed from Database:
taskRouter.delete('/:id', (req, res) => {
    let idToDelete = req.params.id;
    // Sanitize SQL inputs: 
    let sqlText = `
        DELETE from "tasks"
            WHERE "id"=$1;`;
    let sqlValues = [idToDelete];
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            // status message: OK
            res.sendStatus(200);
        }).catch((dbErr) => {
            console.log('delete /task-list/:id error:', dbErr);
            // status message: Internal Server Error
            res.sendStatus(500);
        })
})

// export this router for connection to the server: 
module.exports = taskRouter;