const DOLAR = 42.12;
let subTotal = 0;
let articles = JSON.parse(localStorage.getItem('arrArticles'));
let typeShipping = "standard";
let modalValidation = false;
let shippingAddressValidation = false;

document.addEventListener("DOMContentLoaded", ()=>{
    if (articles.length > 0) {
        for (const elem of articles) {
            showArticles(elem);
        }
    }else{
        document.getElementById('articles').innerHTML = 
        `
            <tr class="text-center">
                <td class="fw-bolder" colspan = "6">No hay articulos</td>
            </tr>
        `;
    }
    //! SHOW BY DEFAULT
    document.getElementById('totalUnit').textContent = subTotal;
    document.getElementById('shippingCost').textContent = Math.round(subTotal * 0.05);
    document.getElementById('total').textContent = subTotal + Math.round(subTotal * 0.05);
});

//! SHOW ARTICLES
function showArticles(elem) {
        const inpNum = document.createElement('input');
        inpNum.type = "number";
        inpNum.min = "1";
        inpNum.value = "1";
        inpNum.classList.add('form-control', 'w-input');
        inpNum.addEventListener("input", (e) => {
            if (inpNum.value != 0) {
                let valorInicial = parseInt(document.getElementById(`subTotal-${elem.id}`).textContent);
                document.getElementById(`subTotal-${elem.id}`).innerHTML = elem.unitCost * e.target.value;
                changeCost(parseInt(document.getElementById(`subTotal-${elem.id}`).textContent)-valorInicial, elem.currency);
                changeShipping();
                inpNum.classList.remove('border-danger');
            }else{
                inpNum.classList.add('border-danger');
            }
        });

        const btnRemove = document.createElement('button');
        btnRemove.innerHTML = "<i class='fas fa-trash'></i>";
        btnRemove.classList.add('btn', 'btn-outline-danger');
        btnRemove.addEventListener('click', () => {
            let subTotal = parseInt(document.getElementById(`subTotal-${elem.id}`).textContent);
            changeCost(-subTotal, elem.currency);
            changeShipping();
            
            articles.splice(articles.indexOf(elem), 1);
            localStorage.setItem('arrArticles', JSON.stringify(articles));
            document.getElementById(elem.id).remove();
        });

        const element = document.createElement('tr');
        element.setAttribute('id', elem.id);
        element.classList.add('align-middle', 'p-4');
        element.innerHTML = 
        `
            <th scope="row"><img class="imgCart" src="${elem.image}"></th>
            <td class="fs-5">${elem.name}</td>
            <td class="fs-5">${elem.currency} ${elem.unitCost}</td>
            <td id="inpCant-${elem.id}"></td>
            <td class="text-decoration-underline text-success fw-bolder">${elem.currency} <span id="subTotal-${elem.id}" class="fs-4">${elem.unitCost}</span></td>
            <td id="removeArticle-${elem.id}"></td>
            `
        document.getElementById('articles').appendChild(element);
        document.getElementById(`inpCant-${elem.id}`).appendChild(inpNum);
        document.getElementById(`removeArticle-${elem.id}`).appendChild(btnRemove);

        //! CHANGE SUBTOTAL IF CURRENCY IS "UYU"
        if (elem.currency == "UYU") {
            subTotal += Math.round(elem.unitCost / DOLAR);
        }else{
            subTotal += elem.unitCost;
        }
}

//! CALC SUBTOTAL OF ALL ARTICLES
function changeCost(diff, currency) {
    if (currency == "UYU") {
        diff += Math.round(diff / DOLAR);
    }
    document.getElementById('totalUnit').textContent = parseInt(document.getElementById('totalUnit').textContent) + diff;
}

//! CHANGE COST ACCORDING TO THE TYPE OF SHIPPING
function changeShipping() {
    let subTotal = parseInt(document.getElementById('totalUnit').textContent);
    let cost = subTotal;

    if (typeShipping == "standard") {
        cost *= 0.05;
    }
    if (typeShipping == "express") {
        cost *= 0.07;
    }
    if (typeShipping == "premium") {
        cost *= 0.15;
    }
    document.getElementById('shippingCost').textContent = Math.round(cost);
    document.getElementById('total').textContent = subTotal + Math.round(cost);
}

//! CHANGE SHIPPINGCOST
document.getElementById('standard').addEventListener('click', () => {
    typeShipping = "standard";
    changeShipping();
});
document.getElementById('express').addEventListener('click', () => {
    typeShipping = "express";
    changeShipping();
});
document.getElementById('premium').addEventListener('click', () => {
    typeShipping = "premium";
    changeShipping();
});

//! SHOW TEXT-ERROR IF NOT CHOOSE A PAYMENT METHOD 
document.getElementById('inpCredit').addEventListener('click', () => {
    document.getElementById('chooseOption').hidden = true;
    disableInputs(true);
    document.getElementById('accountTransfer').classList.remove('border', 'border-danger');
});

document.getElementById('inpTransfer').addEventListener('click', () => {
    document.getElementById('chooseOption').hidden = true;
    disableInputs(false);
    document.getElementById('creditNumber').classList.remove('border', 'border-danger');
    document.getElementById('creditCode').classList.remove('border', 'border-danger');
    document.getElementById('creditVenc').classList.remove('border', 'border-danger');
});

//! BTN BUY
document.getElementById('btnBuy').addEventListener('click', ()=>{
    if (validInput(document.querySelectorAll('#shippingAddress input'))) {
        shippingAddressValidation = true
    }

    if (!modalValidation) {
        document.getElementById('paymentMethod').classList.add('btn-danger');
    }else{
        document.getElementById('paymentMethod').classList.remove('btn-danger');
    }

    if (shippingAddressValidation && modalValidation) {
        document.getElementById('openModalOk').click();
        setTimeout(() => {document.getElementById('closeModalOk').click()}, 3000);
    }
});

//! DISABLED INPUTS OF MODAL
function disableInputs(disabled) {
    document.getElementById('accountTransfer').disabled = disabled;
        document.getElementById('creditNumber').disabled = !disabled;
        document.getElementById('creditCode').disabled = !disabled;
        document.getElementById('creditVenc').disabled = !disabled;
}

document.getElementById('btnModalAccept').addEventListener('click', () => {
    if (document.getElementById('inpCredit').checked) {
        if (validInput(document.querySelectorAll('#divCredit input'))) {
            document.getElementById('btnValid').click();
            modalValidation = true;
        }
    }
    
    if (document.getElementById('inpTransfer').checked) {
        validInput(document.querySelectorAll('#transferInputs input'));
        document.getElementById('btnValid').click();
        modalValidation = true;
    }

    if (!document.getElementById('inpTransfer').checked && !document.getElementById('inpCredit').checked) {
        document.getElementById('chooseOption').hidden = false;
        modalValidation = false;
    }
});

//! VALID INPUTS
function validInput(inp) {
    let result = true;
    for (const elem of inp) {
        let validation = true;
        validation = validation && (elem.value.length > 0 || elem.value > 0);
        if (!validation) {
            elem.classList.add('border', 'border-danger');
        }else{
            elem.classList.remove('border', 'border-danger');
        }
        result = result && validation;
    }
    return result;
}

document.getElementById('creditVenc').addEventListener('input', (e)=>{
    if (e.target.value.length == 2) {
        e.target.value += "/";
    }
});