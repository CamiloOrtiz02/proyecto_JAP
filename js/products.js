//! CAR PRODUCTS URL
const URL_PROD = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem('catID')}.json`;
let data = '';
let arrayListProd = [];
let copyOriginProd = [];

//! GET DATA FROM URL
document.addEventListener("DOMContentLoaded", () =>{
    getJSONData(URL_PROD).then((RESOLVED) => {
            //! RESOLVED: STATUS, DATA {catID, catName, products[]}
            data = RESOLVED.data;
            document.getElementById('catNameHeader').textContent = data.catName;
            document.getElementById('list-prod-').setAttribute('id', `list-prod-${data.catName}`);
            
            //! SAVE COPY FROM PRODUCTS[]
            for (const elem of data.products) {
                copyOriginProd.push(elem);
            }

            //! SAVE ELEMENTS FOR REFERENCE FROM PRODUCTS[]
            arrayListProd = data.products;
            showProducts(data.products);
    });
});

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
            showProducts(sortProd('priceAsc'));
    });

    document.getElementById('sortDesc').addEventListener('click', () =>{
        showProducts(sortProd('priceDesc'));
    });

    document.getElementById('sortByCount').addEventListener('click', () =>{
        let rel = document.getElementById('iconRel');
        if (!rel.classList.contains('fa-sort-numeric-up')) {
            rel.classList.remove('fa-sort-numeric-down');
            rel.classList.add('fa-sort-numeric-up');
            showProducts(sortProd('sortByCountAsc'));
        }else{
            rel.classList.remove('fa-sort-numeric-up');
            rel.classList.add('fa-sort-numeric-down');
            showProducts(sortProd('sortByCountDesc'));
        }
    });

    document.getElementById('rangeFilterCount').addEventListener('click', () =>{
        sortProd('sortByFilterMinMax');
    });

    document.getElementById('clearRangeFilter').addEventListener('click', () =>{
        showProducts(sortProd('clean'));
    });


    function sortProd(criteria) {
        let inpNum = document.querySelectorAll('input[type="number"]');
        let result = [];

        if (criteria == 'sortByFilterMinMax') {
            arrayListProd = copyOriginProd.filter((elem) => {
                return elem.cost >= inpNum[0].value && elem.cost <= inpNum[1].value
            });
            showProducts(arrayListProd);
        }

        switch (criteria) {
            case 'priceAsc':
                result = arrayListProd.sort((a, b) => {
                    if (a.cost < b.cost) {return 1}
                    if (a.cost > b.cost) {return -1}
                    return 0;
                });
                break;

            case 'priceDesc':
                result = arrayListProd.sort((a, b) => {
                    if (a.cost > b.cost) {return 1}
                    if (a.cost < b.cost) {return -1}
                    return 0;
                });
                break;

            case 'sortByCountAsc':
                result = arrayListProd.sort((a, b) => {
                    if (a.soldCount < b.soldCount) {return 1}
                    if (a.soldCount > b.soldCount) {return -1}
                    return 0;
                });
                break;

            case 'sortByCountDesc':
                result = arrayListProd.sort((a, b) => {
                    if (a.soldCount > b.soldCount) {return 1}
                    if (a.soldCount < b.soldCount) {return -1}
                    return 0;
                });
                break;

            case 'clean':
                document.getElementById('sortAsc').checked = false;
                document.getElementById('sortDesc').checked = false;
                document.getElementById('sortByCount').checked = false;
                document.getElementById('rangeFilterCountMin').value = '';
                document.getElementById('rangeFilterCountMax').value = '';
                
                arrayListProd = copyOriginProd;
                return arrayListProd;
                break;

            default:
                result = copyOriginProd;
                break;
        }
        return result;
    }