document.addEventListener("DOMContentLoaded", () => {
    getJSONData(PRODUCT_INFO_URL+localStorage.getItem('prodID')+EXT_TYPE).then(RESOLVED => {
        console.log(RESOLVED);
        document.getElementById('prodName').textContent = RESOLVED.data.name;
        document.getElementById('prodCost').textContent = `${RESOLVED.data.currency} ${RESOLVED.data.cost}`;
        document.getElementById('prodDescription').textContent = RESOLVED.data.description;
        document.getElementById('prodCategory').textContent = RESOLVED.data.category;
        document.getElementById('prodSoldCount').textContent = RESOLVED.data.soldCount;
        imageByDefault(RESOLVED.data.images);
        images(RESOLVED.data.images);
    });
});


function images(images){
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

function imageByDefault(image){
    const imageDefault = document.createElement('img');
    imageDefault.classList.add('img-thumbnail', 'shadow-sm');
    imageDefault.setAttribute('src', image[0]);

    document.getElementById('largeImg').appendChild(imageDefault);
}