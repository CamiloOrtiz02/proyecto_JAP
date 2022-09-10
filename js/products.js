// CAR PRODUCTS URL
const URL_PROD = PRODUCTS_URL+localStorage.getItem('catID')+EXT_TYPE;
let data = '';
let arrayListProd = [];
let copyOriginProd = [];

// GET DATA FROM URL
document.addEventListener("DOMContentLoaded", () =>{
    getJSONData(URL_PROD).then((RESOLVED) => {
            // RESOLVED: STATUS, DATA {catID, catName, products[]}
            data = RESOLVED.data;
            document.getElementById('catNameHeader').textContent = data.catName;
            document.getElementById('list-prod-').setAttribute('id', `list-prod-${data.catName}`);
            
            // SAVE COPY FROM PRODUCTS[]
            for (const elem of data.products) {
                copyOriginProd.push(elem);
            }

            // SAVE ELEMENTS FOR REFERENCE FROM PRODUCTS[]
            arrayListProd = data.products;
            showProducts(data.products);
    });
});

    // SHOW DATA
    function showProducts (products){
        // SAVE DATA OF PRODUCTS
        if (products.length > 0) {     
            document.getElementById(`list-prod-${data.catName}`).innerHTML = "";
            for (const elem of products) {
                let prod = '';
                let divList = document.createElement('div');
                divList.classList.add('list-group-item', 'list-group-item-action', 'cursor-active');
                divList.setAttribute('id', elem.id);

                prod =`
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
                `;
                divList.innerHTML = prod;
                document.getElementById(`list-prod-${data.catName}`).appendChild(divList);
                divList.addEventListener('click', () => {
                    localStorage.setItem('prodID', divList.id);
                    window.location = "product-info.html";
                });
            }
            // INSERT DATA AS ROWS
        }else{
            showWithoutProducts();
        }
    }

    //! EN CASO DE NO HABER PRODUCTOS
    function showWithoutProducts() {
        document.getElementById(`list-prod-${data.catName}`).innerHTML = `
            <div class="row">
                <div class="alert-info">
                    <div class="d-flex w-100 justify-content-center">
                        <h4 class="mb-1">No se encontraron productos</h4>
                    </div>
                </div>
            </div>
        `; 
        
    }

    //! SORT BY PRICE ASC
    document.getElementById('sortAsc').addEventListener('click', () =>{
        sortAsc('price');
    });

    //! SORT BY PRICE DESC
    document.getElementById('sortDesc').addEventListener('click', () =>{
        sortDesc('price');
    });

    
    //! SORT BY REL.
    document.getElementById('sortByCount').addEventListener('click', () =>{
        let rel = document.getElementById('iconRel');
        //! SORT BY ASC ELSE DESC
        if (!rel.classList.contains('fa-sort-numeric-up')) {
            rel.classList.remove('fa-sort-numeric-down');
            rel.classList.add('fa-sort-numeric-up');

            sortAsc('rel');
        }else{
            rel.classList.remove('fa-sort-numeric-up');
            rel.classList.add('fa-sort-numeric-down');
            
            sortDesc('rel');
        }
    });

    document.getElementById('searchProduct').addEventListener('keyup', (e) =>{
        if (e.target.value.length > 0) {
            arrayListProd = copyOriginProd.filter((elem) =>{
                return elem.name.toLowerCase().includes(e.target.value.toLowerCase()) || 
                elem.description.toLowerCase().includes(e.target.value.toLowerCase());
            });
        }else{
            updateListProdOriginal();
        }
        showProducts(arrayListProd);
    });

    //! SORT BY PRICE RANGE
    document.getElementById('rangeFilterCount').addEventListener('click', () =>{
        const inpNum = document.querySelectorAll('input[type="number"]');
        arrayListProd = copyOriginProd.filter((elem) => {
            return (inpNum[0].value == '' || inpNum[0].value == 0 || elem.cost >= inpNum[0].value) && 
            (inpNum[1].value == '' || inpNum[1].value == 0 || elem.cost <= inpNum[1].value)
        });
        showProducts(arrayListProd);
    });

    //! CLEAR FILTERS
    document.getElementById('clearRangeFilter').addEventListener('click', () =>{
        document.getElementById('sortAsc').checked = false;
        document.getElementById('sortDesc').checked = false;
        document.getElementById('sortByCount').checked = false;
        document.getElementById('rangeFilterCountMin').value = '';
        document.getElementById('rangeFilterCountMax').value = '';
        document.getElementById('searchProduct').value = '';
        
        updateListProdOriginal();
        showProducts(arrayListProd);
    });

    //! ORDER BY ASC
    function sortAsc(property) {
        if (property == 'price') {
            arrayListProd.sort((a, b) => {
                if (a.cost < b.cost) {return 1}
                if (a.cost > b.cost) {return -1}
                return 0;
            });
        }
        if (property == 'rel') {
            arrayListProd.sort((a, b) => {
                if (a.soldCount < b.soldCount) {return 1}
                if (a.soldCount > b.soldCount) {return -1}
                return 0;
            });
        }
        showProducts(arrayListProd);
    }

    //! ORDER BY DESC
    function sortDesc(property) {
        if (property == 'price') {
            arrayListProd.sort((a, b) => {
                if (a.cost > b.cost) {return 1}
                if (a.cost < b.cost) {return -1}
                return 0;
            });
        }
        if (property == 'rel') {
            arrayListProd.sort((a, b) => {
                if (a.soldCount > b.soldCount) {return 1}
                if (a.soldCount < b.soldCount) {return -1}
                return 0;
            });
        }
        showProducts(arrayListProd);
    }

    //! COPY ArrayListProd OF CopyOriginProd
    function updateListProdOriginal() {
        for (let i = 0; i < copyOriginProd.length; i++) {
            arrayListProd[i] = copyOriginProd[i];
        }
    }