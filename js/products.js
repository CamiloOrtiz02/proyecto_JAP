//! CAR PRODUCTS URL
const URL_PROD = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem('catID')}.json`;
let data = '';
let flagSort = [false, false, false, false];
let arrayListProd = [];
let copyOriginProd = [];

//! GET DATA FROM URL
document.addEventListener("DOMContentLoaded", () =>{
    getJSONData(URL_PROD).then((RESOLVED) => {
            //! RESOLVED: STATUS, DATA {catID, catName, products[]}
            data = RESOLVED.data;
            changeDataHeader(data);
            
            //! SAVE COPY FROM PRODUCTS[]
            for (const elem of data.products) {
                copyOriginProd.push(elem);
            }

            //! SAVE ELEMENTS FOR REFERENCE FROM PRODUCTS[]
            arrayListProd = data.products;
            
            showProducts(data.products);
    });
});

    //! SHOW HEADER
    function changeDataHeader() {
        document.getElementById('catNameHeader').textContent = data.catName;
        document.getElementById('list-prod-').setAttribute('id', `list-prod-${data.catName}`);
    }

    //! SHOW DATA
    function showProducts (products){
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

    document.getElementById('sortAsc').addEventListener('click', (e) =>{
        changeElementPrice(0, e.target.id, 'priceAsc');
    });

    document.getElementById('sortDesc').addEventListener('click', (e) =>{
        changeElementPrice(1, e.target.id, 'priceDesc');
    });

    document.getElementById('sortByCount').addEventListener('click', () =>{
        
        if (!flagSort[2]) {
            document.getElementById('iconRel').classList.remove('fa-sort-numeric-down');
            document.getElementById('iconRel').classList.add('fa-sort-numeric-up');
            showProducts(sortProd('sortByCountAsc'));
            flagSort[2] = true;
        }else{
            
            document.getElementById('iconRel').classList.remove('fa-sort-numeric-up');
            document.getElementById('iconRel').classList.add('fa-sort-numeric-down');
            showProducts(sortProd('sortByCountDesc'));
            flagSort[2] = false;
        }
    });

    document.getElementById('rangeFilterCount').addEventListener('click', () =>{
        let inpNum = document.querySelectorAll('input[type="number"]');
        
        if(inpNum[0].value > inpNum[1].value){
            console.log(inpNum);
        }
    });

    function sortProd(criteria) {
        let result = [];

        if (criteria === 'priceAsc') {
            result = arrayListProd.sort((a, b) => {
                if (a.cost < b.cost) {return 1}
                if (a.cost > b.cost) {return -1}
                return 0;
            });
        }

        if (criteria === 'priceDesc') {
            result = arrayListProd.sort((a, b) => {
                if (a.cost > b.cost) {return 1}
                if (a.cost < b.cost) {return -1}
                return 0;
            });
        }

        if (criteria === 'sortByCountAsc') {
            result = arrayListProd.sort((a, b) => {
                if (a.soldCount < b.soldCount) {return 1}
                if (a.soldCount > b.soldCount) {return -1}
                return 0;
            });
        }

        if (criteria === 'sortByCountDesc') {
            result = arrayListProd.sort((a, b) => {
                if (a.soldCount > b.soldCount) {return 1}
                if (a.soldCount < b.soldCount) {return -1}
                return 0;
            });
        }

        return result;
    }

    function changeElementPrice(index, id, criteria) {
        if (!flagSort[index]) {
            flagSort[index] = true;
            document.getElementById(id).classList.remove('btn-outline-dark');
            showProducts(sortProd(criteria));
        }else{
            flagSort[index] = false;
            document.getElementById(id).classList.add('btn-outline-dark');
            document.getElementById(id).checked = false;
            showProducts(copyOriginProd);
        }
    }