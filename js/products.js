//! CAR PRODUCTS URL
const URL_PROD = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem('catID')}.json`;

//! GET DATA FROM URL
document.addEventListener("DOMContentLoaded", (e) =>{
    let element = document.querySelector('main');
    // EMPTY "MAIN"
    element.innerHTML = '';

    getJSONData(URL_PROD).then((RESOLVED) => {
        if (RESOLVED.status === 'ok') {
            //! RESOLVED: STATUS, DATA {catID, catName, products[]}
            showHeader(RESOLVED.data)
            showProducts(RESOLVED.data, RESOLVED.data.products);
        }
    });
});

    //! SHOW HEADER
    function showHeader(data) {
        //! INSERT DEFAULT DATA IN THE MAIN 
        document.querySelector('main').innerHTML = `
            <div class= "text-center p-4">
                <h2>Productos</h2>
                <p class= "lead">Veras aqui todos los productos de categoria ${data.catName}</p>
            </div>
            <div class="container">
                <div class="row">
                    <div class="list-group" id="list-prod-${data.catName}">
                    </div>
                </div>
            </div>
            `;

    }

    //! SHOW DATA
    function showProducts (data, products){
        

        let prod = '';

        //! SAVE DATA OF PRODUCTS
        for (const elem of products) {
            prod += `
            <div onclick="setCatID(${data.catID})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${elem.image}" alt="${elem.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${elem.name} - ${elem.currency} ${elem.cost}</h4>
                        <small class="text-muted">${elem.soldCount} vendidos</small>
                    </div>
                    <p class="mb-1">${elem.description}</p>
                </div>
            </div>
        </div>
            `;
        }

        //! INSERT DATA AS ROWS
        document.getElementById(`list-prod-${data.catName}`).innerHTML = prod;
    }
