console.log('client-side javascript is working! ✨');

$(document).ready(function() {
    console.log('client js still working yeah~ 👾');
    getUserName();
    getTasks();
})

function getUserName() {
    console.log('this is function getUserName');
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

function getTasks() {
    $.ajax({
        method: 'GET', 
        url: '/task-list'
    }).then(function (response) {
        $('#list-view').empty();
        // loop thru tasks response & render to DOM
        for(let task of response) {
            $('#list-view').append(`
            <li>${task.task}. STATUS:
            <select name="status" class="statusChoice">
                <option value="WIP" selected>In Progress</option>
                <option value="completed">Completed</option>
            </select>
            , DELETE?
            <button class="deleteBtn">❌</button></li>`)
        }
    })
}