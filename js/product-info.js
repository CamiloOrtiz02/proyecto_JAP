document.addEventListener("DOMContentLoaded", () => {
    getJSONData(PRODUCT_INFO_URL+localStorage.getItem('prodID')+EXT_TYPE).then(RESOLVED => {
        const imageDefault = document.createElement('img');
        console.log(RESOLVED);
        document.getElementById('prodName').textContent = RESOLVED.data.name;
        document.getElementById('prodCost').textContent = `${RESOLVED.data.currency} ${RESOLVED.data.cost}`;
        document.getElementById('prodDescription').textContent = RESOLVED.data.description;
        document.getElementById('prodCategory').textContent = RESOLVED.data.category;
        document.getElementById('prodSoldCount').textContent = RESOLVED.data.soldCount;
        
        imageDefault.classList.add('img-thumbnail', 'shadow-sm');
        imageDefault.setAttribute('src', RESOLVED.data.images[0]);
        document.getElementById('largeImg').appendChild(imageDefault);

        showImages(RESOLVED.data.images);
        showProdsRelated(RESOLVED.data.relatedProducts);
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL+localStorage.getItem('prodID')+EXT_TYPE).then(RESOLVED => {
        console.log(RESOLVED);
        showProdComments(RESOLVED.data);
    });
});


function showImages(images){
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