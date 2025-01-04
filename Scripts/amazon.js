import {cart , addToCart} from '../data/cart.js';
import {products,loadProducts} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

loadProducts(renderProductGrid);

function renderProductGrid(displayProducts) {

  console.log(displayProducts);

  let productsHTML = '';
 
  displayProducts.forEach((product) => {
  
    productsHTML += `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>
  
            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>
  
            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>
  
            <div class="product-price">
              ${product.getPrice()}
            </div>
  
            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
  
            ${product.extraInfoHTML()}
  
  
            <div class="product-spacer"></div>
  
            <div class="added-to-cart" id="${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>
  
            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>`
  });
  
  
  
  document.querySelector('.js-products-grid').innerHTML = productsHTML;
  



updateCartQuantity();

// We're going to use an object to save the timeout ids.
// The reason we use an object is because each product
// will have its own timeoutId. So an object lets us
// save multiple timeout ids for different products.
// For example:
// {
//   'product-id1': 2,
//   'product-id2': 5,
//   ...
// }
// (2 and 5 are ids that are returned when we call setTimeout).

const addedMessageTimeouts = {}; 



function cartNotification(productId) {

  document.getElementById(`${productId}`).style.opacity = 1;

    const previousTimeoutId = addedMessageTimeouts[productId];

    if (previousTimeoutId) {

      clearTimeout(previousTimeoutId);

    }

    const newsetTimeout = setTimeout(() => {

      document.getElementById(`${productId}`).style.opacity = 0;

    },2000);

    addedMessageTimeouts[productId] = newsetTimeout;

    console.log(countQuantity);
    
    console.log(cart);

}

document.querySelectorAll('.js-add-to-cart').forEach((button) => {

  button.addEventListener('click', () => {

    const productId = button.dataset.productId;

    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);

    const quantity = Number(quantitySelector.value);
    
    console.log(quantity);

    addToCart(productId , quantity);

    updateCartQuantity();

    cartNotification(productId);
    
    
  });
  

});

document.querySelector('.js-search-button').
  addEventListener('click',() => {

    let searchResults = [];

    const searchValue = document.querySelector('.search-bar').value;

    products.forEach((product) => {
      if(product.name.includes(searchValue) || product.name.toLowerCase().includes(searchValue)) {

        searchResults.push(product);
      }

    });
    renderProductGrid(searchResults);

    if(searchResults.length === 0) {
      
      document.querySelector('.js-products-grid')
      .innerHTML='<div class="no-products-css">No matching products</div>';
    }
    

  });




}
export function updateCartQuantity() {

  let countQuantity = 0;

    cart.forEach((item) => {

      countQuantity += item.quantity;

    });

    document.querySelector('.js-cart-quantity').innerHTML = countQuantity;

}


