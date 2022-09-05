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
    //! Save the inputs of Email & Password
    const email = document.getElementById('mailID');
    const pass = document.getElementById('passID');

    //! Return verification of Email
    let validMail = emailExp.test(email.value);
    //! Return verification of Password
    let validPass = verifyPassword(pass);
    
    //! Show message as appropriate case
    if (!validMail) {
        document.getElementById('emailAlert').classList.remove('visually-hidden');
        document.getElementById('mailID').classList.add('border-danger');
    } else {
        document.getElementById('emailAlert').classList.add('visually-hidden');
        document.getElementById('mailID').classList.remove('border-danger');
    }

    if (!validPass) {
        //document.getElementById('alertBox').classList.remove('visually-hidden');
        document.getElementById('passAlert').classList.remove('visually-hidden');
        document.getElementById('passID').classList.add('border-danger');
    } else {
        //document.getElementById('alertBox').classList.add('visually-hidden');
        document.getElementById('passAlert').classList.add('visually-hidden');
        document.getElementById('passID').classList.remove('border-danger');
    }

    if (validMail && validPass) {
        localStorage.setItem('isLogin', email.value);
        window.location.href = 'index.html';
    }
});

//! Validate if the password meets the requirements
function verifyPassword(pass) {
    let flag = true;
    let values = [
        pass.value.length > 7,
        exp.mayus.test(pass.value),
        exp.min.test(pass.value),
        exp.esp.test(pass.value),
        exp.num.test(pass.value),
    ];

    for (const elem of values) {
        flag = flag && elem;
    }
    return flag;
}
    //! Esto se utilizara para el registro de usuario
    //! This will use to the user register
    //* Muestra los errores especificos de la password
    /**
     * * 8 CARACTERES
     * * 1 MAYUSCULA
     * * 1 MINUSCULA
     * * 1 SIMBOLO
     * * 1 NUMERO
     * 
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
    */