import {renderOrderSummery} from './checkout/orderSummery.js';
import { renderPaymentSummery } from './checkout/paymentSummery.js';
import { loadProducts,loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
//import '../data/cart-oop.js';
//import '../data/backend-practice.js';

async function loadPage() {
 
  try {
    await loadProductsFetch();

    await new Promise((resolve) => {
      loadCart(() => {
        resolve('value2');
      });
    }); 
  } catch (error) {
    console.log('Unexpected error. Please try again later.'); 
  }
  

  renderOrderSummery();
  renderPaymentSummery();

}

loadPage();

/*
Promise.all([

  loadProductsFetch(),

  new Promise((resolve) => {
    loadCart(() => {
      resolve('value2');
    });
  })

]).then((value) => {
  console.log(value);
  renderOrderSummery();
  renderPaymentSummery();
});
*/
/*
loadProducts(() => {
  renderOrderSummery();
  renderPaymentSummery();
});
*/
 