document.addEventListener("DOMContentLoaded", function(){
    
    if (window.location.href.indexOf('?') == -1){
        window.location.href = 'login.html';
    }

        document.getElementById("autos").addEventListener("click", function() {
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