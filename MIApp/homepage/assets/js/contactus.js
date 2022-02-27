$(document).ready(function () {
    $('#messageBtn').click((e) => {
        e.preventDefault();
        var uName = $("#name").val();
        var uEmail = $("#email").val();
        var uMessage = $("#message").val();

        var contacts = {
            "name": uName, "email": uEmail, "message": uMessage,
        }

        $.ajax({
            method: "POST",
            dataType: "json",
            async: false,
            url: "http://localhost:3000/contact",
            data: contacts,
            success: () => {
                window.location.href = './index.html';
            },
        });
    });
});