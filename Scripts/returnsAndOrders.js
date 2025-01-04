import {orders} from '../data/orders.js';
import { formatCurrency } from './utils/money.js';
import { addToCart } from '../data/cart.js';
import { products, loadProducts} from '../data/products.js';
import { updateCartQuantity } from './amazon.js';

loadProducts(renderOrdersPage);

let options = { month: 'long', day: 'numeric' };
  
function renderOrdersPage() {

  updateCartQuantity();

  console.log(orders);

  let ordersHTML = '';

  orders.forEach((orderitem) => {


    const orderTime =new Date(orderitem.orderTime);

    const dateString = orderTime.toLocaleDateString('en-US', options);
    
    //console.log(dateString);

    ordersHTML+= ` 
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dateString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(orderitem.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderitem.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${addProductsHTML(orderitem)}
          </div>
        </div>
`
  
  });

  document.querySelector('.orders-grid').innerHTML = ordersHTML;

  function addProductsHTML(orderitem) {

    let productsHTML = '';

    orderitem.products.forEach((product) => {

      let matchingItem;

      products.forEach((items) => {
    
        if(product.productId === items.id) {

          matchingItem = items;
          console.log(matchingItem);
        }
        

      });

      

      let deliveryTime = new Date(product.estimatedDeliveryTime);

      const deliveryDate = deliveryTime.toLocaleDateString('en-US', options);

      productsHTML += `

            <div class="product-image-container">
              <img src="${matchingItem.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
              ${matchingItem.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${deliveryDate}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again" data-product-id="${matchingItem.id}"
              data-product-quantity="${product.quantity}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${orderitem.id}&productId=${product.productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>`
    })

    return productsHTML;

  }

  document.querySelectorAll('.js-buy-again').forEach((button) => {
  
    button.addEventListener('click', () => {
  
      const productId = button.dataset.productId;
  
      const quantity = Number(button.dataset.productQuantity);
      
      console.log(quantity);
  
      addToCart(productId , quantity);
  
      updateCartQuantity();
      
      
    });

  }); 
  

}

