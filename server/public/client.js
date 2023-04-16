console.log('client-side javascript is working! ✨');

$(document).ready(function() {
    console.log('client js still working yeah~ 👾');
    getUserName();
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