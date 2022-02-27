
$('#registerationSuccessful').hide()

const alerts = $('#alerts')
const password = $('#password')
const cpassword = $('#cpassword')
const passwordIdenticalAlert = $('#passwordIdenticalAlert')
const passwordRegexp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])(?=.{8,}$)')
const usernameAlert = $('#usernameAlert'),
    emailAlert = $('#emailAlert');
const passwordRegexpAlert = $('#passwordRegexpAlert')
function checkPasswordIdentical() {
    if (password.val() != cpassword.val()) {
        passwordIdenticalAlert.show()
        return false
    } else {
        passwordIdenticalAlert.hide()
        return true
    }
}
function checkPasswordRegexp() {
    if (!passwordRegexp.test(password.val())) {
        passwordRegexpAlert.show()
        return false
    } else {
        passwordRegexpAlert.hide()
        return true
    }
}
$('#password').keyup(function () {
    checkPasswordIdentical()
    checkPasswordRegexp()
})
$('#cpassword').keyup(function () {
    checkPasswordIdentical()
    checkPasswordRegexp()

})
$(document).ready(function () {


    ([usernameAlert, emailAlert]).forEach(e => e.hide())

    $('#register').submit((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!checkPasswordIdentical()) {
            throw new Error("password")
        }
        var ufName = $("#fname").val();
        var ulName = $("#lname").val();
        var uUsername = $("#username").val();
        var uEmail = $("#email").val();
        var uAddress = $("#address").val();
        var uCity = $("#city").val();
        var uCountry = $("#country").val();
        var uPassword = $("#password").val();
        var uCpassword = $("#cpassword").val();
        var uniqueEmail, uniqueUsername;

        //fetch data if email id exists
        $.getJSON("http://localhost:3000/user?email=" + uEmail, function (data) {

            if (data.length > 0) {
                uniqueEmail = false;
            } else {
                uniqueEmail = true;
            }
        }).then(
            async function () {
                ((data) => {
                    const d = data
                })(await $.getJSON("http://localhost:3000/user?username=" + uUsername, function (usernamedata) {

                    if (usernamedata.length > 0) {
                        uniqueUsername = false
                    } else {
                        uniqueUsername = true
                    }
                }))
            }
        ).then(() => {
            if (uniqueEmail && uniqueUsername) {

                if (uPassword === uCpassword) {

                    var users = {
                        "firstName": ufName,
                        "lastName": ulName,
                        "username": uUsername, "email": uEmail, "address": uAddress, "city": uCity,
                        "country": uCountry, "password": uPassword, avatar: ""
                    }

                    $.ajax({
                        method: "POST",
                        dataType: "json",
                        async: false,
                        url: "http://localhost:3000/user",
                        data: users,
                        success: () => {
                            $('#registerationSuccessful').show()
                            $('#registerBtn').prop('disabled', true)

                            setTimeout(() =>
                                window.location.href = '../login/login.html',
                                5000
                            )
                        },
                    });
                }
            }
            else {
                if (!uniqueEmail) {
                    alerts.show()
                    emailAlert.show()
                } else {
                    emailAlert.hide()
                }
                if (!uniqueUsername) {
                    alerts.show()
                    usernameAlert.show()
                } else {
                    usernameAlert.hide()
                }
            }

        }).catch(e => {
            if (e === 'password') {
                alerts.show()

            }
        })

    })
});