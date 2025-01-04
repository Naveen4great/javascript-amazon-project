import { products , loadProducts} from '../data/products.js';
import { orders } from '../data/orders.js';
import { updateCartQuantity } from './amazon.js';

loadProducts(renderTrackingPage);

function renderTrackingPage() {

  const url = new URL(window.location.href);
  const orderId =url.searchParams.get('orderId');
  const productId =url.searchParams.get('productId');

  let matchingproduct;

  products.forEach((items) => {
      
      if(productId === items.id) {
  
        matchingproduct = items;
        
      }
  }); 

  let orderProduct;

  orders.forEach((items) => {
      
    if(orderId === items.id) {

      items.products.forEach((product) => {

        if(productId === product.productId) {

          orderProduct = product;

        }

      });
      
    }

  }); 

  let options = { weekday: 'long' , month: 'long', day: 'numeric' };

  const orderTime = new Date(orderProduct.estimatedDeliveryTime);

  const dateString = orderTime.toLocaleDateString('en-US', options);

  const trackingHTML = `

        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dateString}
        </div>

        <div class="product-info">
          ${matchingproduct.name}
        </div>

        <div class="product-info">
          Quantity: ${orderProduct.quantity}
        </div>

        <img class="product-image" src="${matchingproduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
        
        `;

  document.querySelector('.order-tracking').innerHTML=trackingHTML;      
  
  updateCartQuantity();
}