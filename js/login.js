//! Expresiones regulares
const  exp = {
    min: /[a-z]/,
    num: /[0-9]/,
    mayus: /[A-Z]/,
    esp: /[\@\#\!\¡.\:\-_\^\(\)\=\&\+]/,
}

//! Expresion regular para el correo

const emailExp = /^[a-zA-Z0-9\.\_\-\+\&\#]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;

//! elemento BUTTON
const btnSubmit = document.getElementById('btnSubmit');

btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('mailID');
    const pass = document.getElementById('passID');
    let validMail = emailExp.test(email.value);
    let validPass = requirementsPassword(pass);
    
    if (!validMail) {
        document.getElementById('emailAlert').classList.remove('visually-hidden');
    } else {
        document.getElementById('emailAlert').classList.add('visually-hidden');
    }

    if (validMail && validPass) {
        window.location.href = '../main.html';
    }
});

function requirementsPassword(pass) {
    let flag = true;
    let values = [
        pass.value.length > 7,
        exp.mayus.test(pass.value),
        exp.min.test(pass.value),
        exp.esp.test(pass.value),
        exp.num.test(pass.value),
    ];

    for (let i = 0; i < values.length; i++) {
        if (values[i]) {
            document.getElementById(`${i}`).classList.remove('text-danger');
            document.getElementById(`${i}`).classList.add('text-success');
        }else{
            document.getElementById(`${i}`).classList.remove('text-success');
            document.getElementById(`${i}`).classList.add('text-danger');
        }
        flag = flag && values[i];
    }

    return flag;
}
