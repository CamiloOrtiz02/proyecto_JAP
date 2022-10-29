const DOLAR = 42.12;
let subTotal = 0;
let articles = JSON.parse(localStorage.getItem('arrArticles'));
let typeShipping = "standard";

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

    switch (typeShipping) {
        case 'standard':
            cost *= 0.05;
            break;
        case 'express':
            cost *= 0.07;
            break;
        case 'premium':
            cost *= 0.15;
            break;
        default:
            cost *= 0.05;
            break;
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

document.getElementById('inpCredit').addEventListener('click', () => {
    disableInputs(true);
    document.getElementById('accountTransfer').classList.remove('border', 'border-danger');
});

document.getElementById('inpTransfer').addEventListener('click', () => {
    disableInputs(false);
    document.getElementById('creditNumber').classList.remove('border', 'border-danger');
    document.getElementById('creditCode').classList.remove('border', 'border-danger');
    document.getElementById('creditVenc').classList.remove('border', 'border-danger');
});

//! BTN BUY
document.getElementById('btnBuy').addEventListener('click', ()=>{

});

//! MODAL

function disableInputs(flag) {
    document.getElementById('accountTransfer').disabled = flag;
        document.getElementById('creditNumber').disabled = !flag;
        document.getElementById('creditCode').disabled = !flag;
        document.getElementById('creditVenc').disabled = !flag;
}

document.getElementById('btnModalAccept').addEventListener('click', () => {
    if (document.getElementById('inpCredit').checked) {
        validInput(document.getElementById('creditNumber'));
        validInput(document.getElementById('creditCode'));
        validInput(document.getElementById('creditVenc'));
    }
    
    if (document.getElementById('inpTransfer').checked) {
        validInput(document.getElementById('accountTransfer'));
    }
});

function validInput(inp) {
    if(inp.value.length == 0){
        inp.classList.add('border', 'border-danger');
    }else{
        inp.classList.remove('border', 'border-danger');
    }
}

document.getElementById('creditVenc').addEventListener('input', (e)=>{
    if (e.target.value.length == 2) {
        e.target.value += "/";
    }
});