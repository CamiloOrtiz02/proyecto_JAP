
document.addEventListener("DOMContentLoaded", ()=>{
    let articles = JSON.parse(localStorage.getItem('arrArticles'));
    if (articles != null) {
        for (const elem of articles) {
            const element = document.createElement('tr');
            element.classList.add('align-middle', 'p-4');

            const inpNum = document.createElement('input');

            inpNum.type = "number";
            inpNum.min = "1";
            inpNum.value = "1";
            inpNum.classList.add('form-control', 'w-input');
            element.innerHTML = 
            `
                <th scope="row"><img class="imgCart" src="${elem.image}"></th>
                <td>${elem.name}</td>
                <td>${elem.currency} ${elem.unitCost}</td>
                <td id="inpCant-${elem.id}"></td>
                <td class="text-decoration-underline text-success fw-bolder">${elem.currency} <span id="subTotal-${elem.id}" class="fs-4">${elem.unitCost}</span></td>
            `
            document.getElementById('articles').appendChild(element);

            inpNum.addEventListener("input", (e) => {
                if (inpNum.value != 0) {
                    inpNum.classList.remove('border-danger');
                    document.getElementById(`subTotal-${elem.id}`).innerHTML = elem.unitCost * e.target.value; 
                }else{
                    inpNum.classList.add('border-danger');
                }
            })
            document.getElementById(`inpCant-${elem.id}`).appendChild(inpNum);
        }
    }else{
        document.getElementById('articles').innerHTML = 
        `
            <tr class="text-center">
                <td class="fw-bolder" colspan = "5">No hay articulos</td>
            </tr>
        `;
    }
});


