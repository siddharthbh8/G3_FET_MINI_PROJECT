
function updateUserSearch() {
    if (checkSession()) {
        const user = fetchUserDetails()
        $('#busSearch').prop('src', user.avatar)
        $('#bus').html(user.firstName)
    }
}
function categoryToggleFunction() {
    $("#category-row-1").toggle(1000);
    $("#category-row-2").toggle(1500);
}
function searchBoxKeyup() {
    var value = $(this).val().toLowerCase();

    $('#get-gallery1 > div').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });

}
function displayComments(comments) {
    if (comments.length === 0) {
        $('#commentsSection').html(`<div class="alert alert-info" role="alert">
        No comments yet.  
       </div>`)
    } else {
        let op = '';
        for (const i of comments) {
            if (i) {
               
                op = op + `<div class="alert alert-light" role="alert">
                <p class="small">${new Date(i.date).toUTCString()}</p>
            ${i.details} 
           </div>`
            }
        }
        $('#commentsSection').html(op)
    }
}
function loadComments(postId) {
    $.ajax({
        url: 'http://localhost:3000/comment?post_id=' + postId,
        method: 'GET'
    }).then(displayComments)
}
function commentBoxLoad() {
    if (!checkSession()) {
        window.location.href = '../login/login.html'
    } else {
        const postId = this.id.split('-')[1]
        const user = fetchUserDetails()


        //display comments
        $('#commentForm').submit(function (event) {
            event.preventDefault()
            event.stopPropagation()
            $.ajax({
                url: 'http://localhost:3000/comment',
                method: 'POST',
                data: {
                    "post_id": postId,
                    "user_id": user.id,
                    "date": new Date().toISOString(),
                    "likes": 0,
                    "details": $('#message-text').val()
                },
                dataType: 'json',
                success: function (data) {
                    loadComments(postId);
                    $('#message-text').val('')
                },

            })
        })
        loadComments(postId)

    }

}

function busSearchClick() {
    if (checkSession()) {
        const user = fetchUserDetails()
        
        $('#get-gallery1 > div').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(user.firstName.toLowerCase()) > -1);
        });

    } else {


        const value = $('#bus').text();
        $('#get-gallery1 > div').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    }

}
function sportsSearchClick() {
    const value = $('#sports').text();
    $('#get-gallery1 > div').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });

}
function travelSearchClick() {
    const value = $('#travel').text();
    $('#get-gallery1 > div').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });

}
function bikeSearchClick() {
    const value = $('#bike').text();
    $('#get-gallery1 > div').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });

}
$(document).ready(function () {

    updateUserSearch()
    $("#category-btn").on("click", categoryToggleFunction);
    $("#search_box").on("keyup", searchBoxKeyup);
    $.getJSON('http://localhost:3000/user', function (data) {
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/post",
            success: function (result) {
                var output = "";
                for (var i in result) {
                    if (result[i]) {
                        var hashToBeInclude = result[i].hashtags;
                        
                        output += '<div class="col-md-6 col-lg-6 item card p-3"><a class="lightbox" href="' + result[i].image + '"><img class="img-thumbnail img-fluid image" src="' + result[i].image + '" alt="Image not found"><figcaption class="mt-3">' + result[i].title + '</figcaption></a><p class="author">User :&nbsp' + data[result[i].user_id].firstName + '&nbsp;' + data[result[i].user_id].lastName + '</p><p class="image-detail text-center">Description: ' + result[i].details + '<div class="row mb-4"><div class="col"><p class="hashtag">' + hashToBeInclude + '</p></div></div><div class="row"><div class="col-sm-4 col-md-4 col-lg-4 col-xl-4 col-4 text-center"><button class="btn likes" id="p-' + result[i].id + '">&#128153; ' + result[i].likes + '</button></div><div class="col-sm-4 col-md-4 col-lg-4 col-xl-4 col-4 text-center"></div><div class="col-sm-4 col-md-4 col-lg-4 col-xl-4 col-4 text-center"><button class="btn btn-primary commentbox" id="c-' + result[i].id + '" data-toggle="modal" data-target="#commentModal">Comments</button></div></div></div>';
                    }
                }
                $("#get-gallery1").html(output);
                // $("#get-gallery2").html(output);

                $('.commentbox').click(commentBoxLoad)
                $('.likes').click(function () {
                    if (!checkSession()) {
                        window.location.href = '../login/login.html'
                    } else {
                        const postId = this.id.split('-')[1]
                        $.ajax({
                            url: 'http://localhost:3000/post/' + postId,
                            method: 'GET'

                        }).then((postData) => {
                            
                            postData.likes = `${+postData.likes + 1}`;
                            $.ajax({
                                url: 'http://localhost:3000/post/' + postData.id,
                                method: 'PUT',
                                data: JSON.stringify(postData),
                                success: function (data) {
                                    $('#p-' + data.id).html('💙:' + data.likes)
                                },
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                        })
                    }


                })
            }

        }).then(() => {
            if ($('.clean-gallery').length > 0) {
                baguetteBox.run('.clean-gallery', { animation: 'slideIn' });
            }

            if ($('.clean-product').length > 0) {
                (function () {
                    $('.sp-wrap').smoothproducts();
                })()
            }

        })
    });
    $('#busSearch').on("click", busSearchClick);
    $('#animalSearch').on("click", function () {
        $('#get-gallery1 > div').each(function (k, v) {
            $(v).show()
        })

    });
    $('#sportsSearch').on("click", sportsSearchClick);
    $('#technologySearch').on("click", function () {
        const value = $('#technology').text();
        $('#get-gallery1 > div').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });

    });
    $('#travelSearch').on("click", travelSearchClick);
    $('#citySearch').on("click", function () {
        const value = $('#city').text();
        $('#get-gallery1 > div').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });

    });
    $('#bikeSearch').on("click", bikeSearchClick);
    $('#galaxySearch').on("click", function () {
        const value = $('#galaxy').text();
        $('#get-gallery1 > div').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });

    });


});

