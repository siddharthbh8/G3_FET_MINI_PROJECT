


//user details
const email = $('#email'),
    username = $('#username'),
    firstName = $('#first_name'),
    lastName = $('#last_name');


email.val(userDetails.email)
username.val(userDetails.username)
firstName.val(userDetails.firstName)
lastName.val(userDetails.lastName)

// address details
const address = $('#address'),
    city = $('#city'),
    country = $('#country');
address.val(userDetails.address)

//change to userDetails city
city.val(userDetails.city)

//change to userDetails country
country.val(userDetails.country)

const save = $('#save-details'),
    edit = $('#edit-details'),
    editContact = $('#edit-contact'),
    saveContact = $('#save-contact');

function switchBtn(bool) {
    edit.prop('disabled', !bool);
    save.prop('disabled', bool);
    const saveProp = [firstName, lastName];//cannot change username and email
    for (const s of saveProp) {
        s.prop('disabled', bool)
    }
}

save.click(function () {
    //upload the changes
    userDetails.firstName = firstName.val()
    userDetails.lastName = lastName.val()

    $.ajax({
        url: 'http://localhost:3000/user/' + userDetails.id,
        method: 'PUT',
        data: JSON.stringify(userDetails),
        success: function () {
            updateDropdown(`${userDetails.firstName} ${userDetails.lastName}`)
            localStorage.setItem('userDetails', JSON.stringify(userDetails))

            
            $('#detailsSuccess').show()
            setTimeout(function () {
                $('#detailsSuccess').hide()
            }, 2000)
        },
        headers: {
            'Content-Type': 'application/json'
        },
        error: () => {
            
            $('#detailsFail').show()
            setTimeout(function () {
                $('#detailsFail').hide()
            }, 2000)
            document.location.reload()
        }

    })
    switchBtn(true);
});

edit.click(function () {
    switchBtn(false);
});


function switchEdit(bool) {
    editContact.prop('disabled', bool)
    const notBool = [city, country, address, saveContact]
    for (const e of notBool) {
        e.prop('disabled', !bool)
    }
}

editContact.click(function () {
    switchEdit(true)
});

saveContact.click(function () {
    //upload the changes
    userDetails.address = address.val()
    userDetails.city = city.val()
    userDetails.country = country.val()
    $.ajax({
        url: 'http://localhost:3000/user/' + userDetails.id,
        method: 'PUT',
        data: JSON.stringify(userDetails),
        success: function () {

            localStorage.setItem('userDetails', JSON.stringify(userDetails))

            $('#contactSuccess').show()
            setTimeout(function () {
                $('#contactSuccess').hide()
            }, 2000)
        },
        headers: {
            'Content-Type': 'application/json'
        },
        error: () => {
            $('#contactFail').show()
            setTimeout(function () {
                $('#contactFail').hide()
            }, 2000)
            document.location.reload()
        }

    })
    switchEdit(false)
});


