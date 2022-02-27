$(document).ready(function () {

    $('#loginBtn').click((e) => {
        e.preventDefault();
        const uEmail = $("#email").val();
        const uPassword = $("#password").val();


        $.get("http://localhost:3000/user?email=" + uEmail + '&password=' + uPassword, function (data) {
            if (data.length === 0) {
                //not reg
                //handle this case
                $('#message').show()
                $('#loginError').show()
            } else {
                const userDetails = data
                //save in localstorage
                localStorage.setItem('userDetails', JSON.stringify(userDetails[0]))
                window.location.href = '../gallery/gallery.html'

            }

        });
    });
})