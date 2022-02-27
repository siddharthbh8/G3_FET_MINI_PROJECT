//script for profile
//if not logged in
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
//fetch user details
function fetchUserDetails() {
    return JSON.parse(localStorage.getItem('userDetails'))
}
function buildNavbar() {
    if (checkSession()) {
        const userDetails = fetchUserDetails();
        updateDropdown(userDetails.firstName + ' ' + userDetails.lastName)
    } else {
        window.location.href = '../login/login.html'
    }
}
buildNavbar()



const userDetails = fetchUserDetails()

function updateDropdown(name) {
    
    $('#name-dropdown').text(`${name}`)
}
