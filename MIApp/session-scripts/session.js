$("#logout").click(function (event) {
    event.preventDefault()
    event.stopPropagation()
    localStorage.clear();
    window.location.href = '../login/login.html'
})
function checkSession() {
    if (!localStorage.getItem('userDetails')) {
        //if null
        return false
    }
    return true
}


buildNavbar()
function updateDropdown(name) {
    
    $('#name-dropdown').text(`${name}`)
}
function fetchUserDetails() {
    return JSON.parse(localStorage.getItem('userDetails'))
}

function buildNavbar() {
    if (checkSession()) {
        const userDetails = fetchUserDetails();
        updateDropdown(userDetails.firstName + ' ' + userDetails.lastName)
        $("#nav-dropdown").show()
        $('#nav-login').hide()
        $('#nav-signup').hide()
    } else {
        $("#nav-dropdown").hide()
        $('#nav-login').show()
        $('#nav-signup').show()
    }
}