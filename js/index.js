const URL_CART = CART_INFO_URL + '25801' + EXT_TYPE;

document.addEventListener("DOMContentLoaded", function(e){
    if (localStorage.getItem('isLogin') == null) {
        document.body.classList.add('invisible');
        window.location.href = 'login.html';
    }  

    if (localStorage.getItem('arrArticles') == null) {
        getJSONData(URL_CART).then(RESOLVED => {
            localStorage.setItem('arrArticles', JSON.stringify(RESOLVED.data.articles));
        });
    }

    document.body.classList.remove('invisible');
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    
});