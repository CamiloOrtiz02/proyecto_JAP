const URL_PROD_INFO = PRODUCT_INFO_URL+localStorage.getItem('prodID')+EXT_TYPE;
const URL_PROD_COMMENTS = PRODUCT_INFO_COMMENTS_URL+localStorage.getItem('prodID')+EXT_TYPE;
let stars = document.querySelectorAll('#commentStars label');

document.addEventListener("DOMContentLoaded", () => {
    // API OF PRODUCT INFO
    getJSONData(URL_PROD_INFO).then(RESOLVED => {
        document.getElementById('prodName').textContent = RESOLVED.data.name;
        document.getElementById('prodCost').textContent = `${RESOLVED.data.currency} ${RESOLVED.data.cost}`;
        document.getElementById('prodDescription').textContent = RESOLVED.data.description;
        document.getElementById('prodCategory').textContent = RESOLVED.data.category;
        document.getElementById('prodSoldCount').textContent = RESOLVED.data.soldCount;
        
        const imageDefault = document.createElement('img');
        
        imageDefault.classList.add('img-thumbnail', 'shadow-sm');
        imageDefault.setAttribute('src', RESOLVED.data.images[0]);
        document.getElementById('largeImg').appendChild(imageDefault);

        showSmallImages(RESOLVED.data.images);
        showProdsRelated(RESOLVED.data.relatedProducts);
    });

    // API OF COMMENTS
    getJSONData(URL_PROD_COMMENTS).then(RESOLVED => {
        if (RESOLVED.data.length > 0) {
            showProdComments(RESOLVED.data);
        }else{
            document.getElementById('prodComments').innerHTML = 
            `
                <div class="border p-3 text-center">NO HAY COMENTARIOS</div>
            `;
        }
    });
});

// SHOW SMALL IMAGES
function showSmallImages(images){
    for (const elem of images) {
        let imgs = document.createElement('img');
        imgs.setAttribute('src', elem);
        imgs.classList.add('img-thumbnail', 'shadow-sm');
        document.getElementById('smallImgs').appendChild(imgs);

        imgs.addEventListener('click', () => {
            document.getElementById('largeImg').innerHTML = `
            <img src="${imgs.src}" class="img-thumbnail">
            `;
        });
    }
}

//! SHOW RELATED PRODUCTS
function showProdsRelated(related){
    for (const elem of related) {
        let prodRel = document.createElement('div');
        prodRel.classList.add('list-group-item', 'list-group-item-action', 'w-25', 'ms-3', 'border', 'm-2');
        prodRel.innerHTML = `
            <img src="${elem.image}" class="img-thumbnail">
            <p class="h4">${elem.name}</p>
        `
        document.getElementById('prodList').appendChild(prodRel);
        prodRel.addEventListener('click', () =>{
            localStorage.setItem('prodID', elem.id);
            window.location.reload();
        });
    }
}

// SHOW PRODUCTS COMMENTS
function showProdComments(comments) {
    for (const elem of comments) {
        let prodCom = document.createElement('div');
        prodCom.classList.add('pb-2', 'list-group-item');
        prodCom.innerHTML = `
            <p class="fw-bold">${elem.user} - 
            <span class="small text-muted">${elem.dateTime}</span>
            <span class="float-end">${showScore(elem.score)}</span>
            </p>
            <p>${elem.description}</p>
        `
        document.getElementById('prodComments').appendChild(prodCom);
    }
}

// SHOW SCORE IN COMMENTS
function showScore(num){
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < num) {
            stars += `<span class="fa fa-star checked"></span>`;
        }else{
            stars += `<span class="fa fa-star"></span>`;
        }
    }
    return stars;
}

// EVENTS OF STAR
for (const elem of stars) {
    elem.addEventListener('click', () => starComments(elem));
    elem.addEventListener('mouseover', () => starComments(elem));
}

document.getElementById('commentStars').addEventListener('mouseout', () => {
    starComments(stars[getScore()]);
});

// PAINT STARS
function starComments(score){
    for (let i = 0; i < 5; i++) {
        if (i < score.control.id) {
            stars[i].classList.add('checked');
        }else{
            stars[i].classList.remove('checked');
        }
    }
}

// GET SCORE
function getScore () {
    let index = 0;
    for (let i = 0; i < 5; i++) {
        if (stars[i].control.checked) {
            index = i;
        }
    }
    return index;
}


// BTN SUBMIT COMMENT
document.getElementById('submitComment').addEventListener('click', () => {
    let date = new Date();
    date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    let arr = [{
        user : localStorage.getItem('isLogin'),
        dateTime : date,
        score : getScore()+1,
        description : document.getElementById('addComments').value
    }];

    showProdComments(arr);

    // EMPTY FORM ELEMENTS
    document.getElementById('addComments').value = '';
    starComments(stars[0]);
    stars[0].control.checked = true;
});