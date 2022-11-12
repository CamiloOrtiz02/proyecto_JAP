const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

//! Expresion regular para el correo
const emailExp = /^[a-zA-Z0-9\.\_\-\+\&\#]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;

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
      <ul class="dropdown-menu dropdown-menu-dark w-100 position-absolute" aria-labelledby="dropdownMenuButton2">
        <li><a class="dropdown-item" href="cart.html">Mi Carrito <i class="fas fa-shopping-cart float-end pt-1"></i></a></li>
        <li><a class="dropdown-item" href="my-profile.html">Mi Perfil <i class="fas fa-user-circle float-end pt-1"></i></a></li>
        <li><hr class="dropdown-divider"></li>
        <li id="logOut"><a class="dropdown-item" href="#">Cerrar Sesion <i class="fas fa-sign-out-alt float-end pt-1"></i></a></li>
      </ul>
    </div>
  `);

  document.getElementById('logOut').addEventListener('click', () => {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('arrArticles');
    window.location = "login.html";
  });
});

//! VALID INPUTS
function validInput(inp) {
  let result = true;
  for (const elem of inp) {
    result = validate(elem, (elem.value.length > 0 || elem.value > 0)) && result;
  }
  return result;
}

function validate(elem, exp) {
  console.log(elem, exp, elem.value)
  if (!exp) { 
    elem.classList.remove('is-valid');
    elem.classList.add('is-invalid');
  }else{
    elem.classList.remove('is-invalid');
    elem.classList.add('is-valid');
  }
  return exp;
}