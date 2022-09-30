const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('user').insertAdjacentHTML('afterbegin',
  `
    <div class="dropdown">
      <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
        ${localStorage.getItem('isLogin')}
      </button>
      <ul class="dropdown-menu dropdown-menu-dark w-100" aria-labelledby="dropdownMenuButton2">
        <li><a class="dropdown-item" href="cart.html">Mi Carrito <i class="fas fa-shopping-cart float-end pt-1"></i></a></li>
        <li><a class="dropdown-item" href="my-profile.html">Mi Perfil <i class="fas fa-user-circle float-end pt-1"></i></a></li>
        <li><hr class="dropdown-divider"></li>
        <li id="logOut"><a class="dropdown-item" href="#">Cerrar Sesion <i class="fas fa-sign-out-alt float-end pt-1"></i></a></li>
      </ul>
    </div>
  `);

  document.getElementById('logOut').addEventListener('click', () => {
    localStorage.removeItem('isLogin');
    window.location = "login.html";
  });
});

