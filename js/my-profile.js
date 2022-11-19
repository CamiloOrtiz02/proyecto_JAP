const FORM = document.getElementById("formProfile");
const INPUTS_REQUIREDS = document.querySelectorAll("input.required");

document.addEventListener('DOMContentLoaded', ()=>{
    showData();
});

function showData() {
    document.getElementById('email').value = localStorage.getItem('isLogin');
    if (localStorage.getItem('data-profile')) {
        let dataProfile = JSON.parse(localStorage.getItem('data-profile'));
        for (const key of Object.keys(dataProfile)) {
            FORM[key].value = dataProfile[key];
        }
    }
}

document.getElementById("saveChanges").addEventListener('click', (e)=>{
    e.preventDefault();
    //! SAVE CHANGES
    if (validInput(INPUTS_REQUIREDS)) {
        let data = {
            'firstName': document.getElementById('firstName').value,
            'secondName': document.getElementById('secondName').value,
            'firstSurname': document.getElementById('firstSurname').value,
            'secondSurname': document.getElementById('secondSurname').value,
            'phone': document.getElementById('phone').value
        }
        localStorage.setItem('data-profile', JSON.stringify(data));
    }
    if (validate(document.getElementById('email'), emailExp.test(document.getElementById('email').value))){ 
        localStorage.setItem('isLogin', document.getElementById('email').value);
        document.getElementById('dropdownMenuButton2').textContent = document.getElementById('email').value;
    }
});
