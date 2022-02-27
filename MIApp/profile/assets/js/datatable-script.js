
$(document).ready(function () {

    $.ajax({
        url: 'http://localhost:3000/post',
        data: {
            user_id: userDetails.id
        },
        type: 'GET',
        dataType: 'json',
        success: function (posts) {
            var data = '';
            $.each(posts, function (k, v) {
                setPosts(posts)
                data += '<tr >';
                data += '<td>' + '<img class="rounded-circle mr-2" width="40" height="40" src="' + v.image + '">' + v.title + '</td>';
                data += ' <td>' + new Date(v.date).toUTCString() + '</td>';
                data += ' <td>' + v.likes + '</td>';
                data += ' <td>' + v.hashtags + '</td>';
                data += '</tr>';
            })
            $('tbody').append(data);
        }
    }).then(function () {
        $('#dataTable').DataTable();
    });
});
let userPosts;
function setPosts(posts) {
    userPosts = posts
}
