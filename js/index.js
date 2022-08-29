document.addEventListener("DOMContentLoaded", function(e){
    
    if (sessionStorage.getItem('isLogin') == null) {
    document.body.classList.add('invisible');
        window.location.href = 'login.html';
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