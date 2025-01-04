import {cart,removeFromCart,updateDeliveryOption,updateQuantity} from '../../data/cart.js';
import {products,getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions,getDeliveryOption} from '../../data/delivaryOptions.js';
import { renderPaymentSummery } from './paymentSummery.js';


 export function renderOrderSummery() {

  let checkoutHTML = '';

  cart.forEach((cartItems) => {

    const productId = cartItems.productId;

    const matchingProduct = getProduct(productId);

    
    const deliveryOptionsId = cartItems.deliveryOptionid;

    const deliveryOption = getDeliveryOption(deliveryOptionsId);

    const today = dayjs();//external library to get date

    const deliveryDate = today.add( deliveryOption.deliveryDays,'days');

    const dateString = deliveryDate.format('dddd, MMMM D');


    checkoutHTML += `
            <div class="cart-item-container
              js-cart-item-container js-cart-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    ${matchingProduct.getPrice()}
                  </div>
                  <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItems.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                      Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                    <span class="save-quantity-link js-save-link   link-primary" data-product-id="${matchingProduct.id}">
                      Save
                    </span>  
                    <span 
                    class="delete-quantity-link link-primary 
                    js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  ${deliveryOptionsHTML(matchingProduct,cartItems)}
                </div>
              </div>
            </div>`;
            
    
    });

    function deliveryOptionsHTML(matchingProduct,cartItems) {

      let html = '';

      deliveryOptions.forEach((deliveryOption) => {

        const today = dayjs();//external library to get date

        const deliveryDate = today.add( deliveryOption.deliveryDays,'days');

        const dateString = deliveryDate.format('dddd, MMMM D');

        const priceString = deliveryOption.priceCents 
        === 0
          ?'FREE'
          :`$${formatCurrency(deliveryOption.priceCents)} -`;

        const isChecked = deliveryOption.id === cartItems.deliveryOptionid;

        html +=

                `
                  <div class="delivery-option js-delivery-option"
                  data-product-id="${matchingProduct.id}"
                  data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio"
                      ${isChecked ? 'checked' : '' }
                      class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        ${dateString}
                      </div>
                      <div class="delivery-option-price">
                        ${priceString} Shipping
                      </div>
                    </div>
                  </div>
                `
      
      });

      return html

    }

    document.querySelector('.js-order-summary').innerHTML = checkoutHTML;

    updateCartQuantityHeader();
    //console.log(checkoutHTML);

    document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {

      deleteLink.addEventListener('click',() => {

        const productId = deleteLink.dataset.productId;

        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-container-${productId}`);

        container.remove();

        updateCartQuantityHeader();

        renderPaymentSummery();

      });

    });

    function updateCartQuantityHeader() {

      let countQuantity = 0;
    
        cart.forEach((item) => {
    
          countQuantity += item.quantity;
    
        });

    
        document.querySelector('.js-checkout-header').innerHTML=`${countQuantity} items`;
    
    }

    document.querySelectorAll('.js-update-link').forEach((updateLink) => {

      updateLink.addEventListener('click',() => {

        const productId = updateLink.dataset.productId;
        
        const container = document.querySelector(`.js-cart-container-${productId}`);

        container.classList.add('is-editing-quantity');

        console.log(container);
        
      });

    });

    document.querySelectorAll('.js-save-link').forEach((saveLink) => {

      saveLink.addEventListener('click',() => {

        const productId = saveLink.dataset.productId;
        
        const container = document.querySelector(`.js-cart-container-${productId}`);

        console.log(container);

        container.classList.remove('is-editing-quantity');

        const newQuantity =  Number(document.querySelector(`.js-quantity-input-${productId}`).value);
        
        updateQuantity(productId,newQuantity);

        updateCartQuantityHeader();

        renderPaymentSummery();

      });

    });

    document.querySelectorAll('.js-delivery-option')
    
      .forEach((element) => {

        element.addEventListener('click', () => {

          const {productId, deliveryOptionId} = element.dataset;

          updateDeliveryOption(productId, deliveryOptionId);

          renderOrderSummery();

          renderPaymentSummery();

        });

      });
  
}


    