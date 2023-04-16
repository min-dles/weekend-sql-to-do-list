console.log('client-side javascript is working! ✨');

$(document).ready(function() {
    console.log('client js still working yeah~ 👾');
    clickListeners();
    getUserName();
    getTasks();
    $('#list-view').on('click', '.deleteBtn', deleteTask);
    $('#list-view').on('change', '.statusChoice', taskStatus);
})

// CLICK LISTENERS - need two for USER & TASKS 
function clickListeners() {
    // FIRST, collect user data
    $('#nameBtn').on('click', function() {
        // user input sent as object: 
        let newUser = {
            name: $('#userName').val(),
        };
        collectName(newUser);

    });
    // SECOND, collect task data
    $('#submitBtn').on('click', function() {
        // user input for TASKS: 
        let newTask = {
            task: $('#taskNotes').val(),
            status: 'false',
        };
        collectNewTasks(newTask);
    });
}

// RENDER USERNAME TO THE DOM
function getUserName() {
    $.ajax({
        method: 'GET',
        url: '/user'
    }).then(function (response) {
        $('#user').empty();
        $('#user').append(`
        ${response[response.length-1].name}'s`)
    }).catch(function (error) {
        console.log('There is an error in GET for /user:', error);
    })
}

// RENDER TASKS TO THE DOM
function getTasks() {
    $.ajax({
        method: 'GET', 
        url: '/task-list'
    }).then(function (response) {
        $('#list-view').empty();
        // loop thru tasks response & render to DOM
        for(let task of response) {
            $('#list-view').append(`
            <li data-id=${task.id}>
                ${task.task} ➡️ STATUS:
                <select name="status" class="statusChoice">
                    <option value="WIP" class="pending" selected>In Progress</option>
                    <option value="completed" class="done">Completed</option>
                </select>
                ➡️ DELETE?
                <button class="deleteBtn">❌</button>
            </li>`)
        }
    })
}

// send user input to the database: 
function collectNewTasks(newTask) {
    $.ajax({
        method: 'POST',
        url: '/task-list',
        data: newTask
    }).then(function (response) {
        getTasks();
        $('#taskNotes').val('');
    }).catch(function (error) {
        console.log('Error with POST /task-list:', error);
    })
}

function collectName(newUser) {
    $.ajax({
        method: 'POST', 
        url: '/user',
        data: newUser
    }).then(function (response) {
        getUserName();
        $('#userName').val('');
    }).catch(function (error) {
        console.log('Error with POST for /user:', error);
    })
}

// user can DELETE a task item from DOM & Database: 
function deleteTask() {
    // delete task by the database ID of <li> selected 
    let idToDelete = $(this).parent().data('id');
    $.ajax({
        method: 'DELETE',
        url: `/task-list/${idToDelete}`
    }).then(function (response) {
        // call getTasks to update DOM:
        getTasks();
    }).catch(function(error) {
        alert('Oh no, issue with deleting')
        console.log(`Error deleting ${idToDelete} error ---> ${error}`);
    })
}

// user can UPDATE a task item in Database & render change to DOM:
function taskStatus() {
    let idToUpdate = $(this).parent().data('id');
    console.log('ID being updated for status change:', idToUpdate);

    $.ajax({
        method: 'PUT',
        url: `/task-list/${idToUpdate}`,
        data: {
            status: true
        }
    }).then(function (response) {
        getTasks();
    }).catch(function(error) {
        console.log(`Error taskStatus on ${idToUpdate}, error --> ${error}`);
    })
}