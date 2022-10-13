
document.addEventListener("DOMContentLoaded", ()=>{
    let articles = JSON.parse(localStorage.getItem('arrArticles'));
    if (articles != null) {
        for (const elem of articles) {
            const element = document.createElement('tr');
            const inpNum = document.createElement('input');
            inpNum.type = "number";
            inpNum.min = "0";
            inpNum.value = "1";

            element.innerHTML = 
            `
            <th scope="row"><img src="${elem.image}"></th>
            <td>${elem.name}</td>
            <td>${elem.currency} ${elem.unitCost}</td>
            <td>${}</td>
            <td>${elem.currency} <span id="subTotal">${elem.unitCost}</span></td>
            `
            document.getElementById('articles').appendChild(element);
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


