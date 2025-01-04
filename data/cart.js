export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
  }
}
function saveToStorage() {

    localStorage.setItem('cart',JSON.stringify(cart));

}

export function addToCart(productId, quantity) {

  let matchingItem;

  cart.forEach((items) => {

    if(productId === items.productId){
      matchingItem = items;
    }

  });

  if(matchingItem) {
     matchingItem.quantity += quantity;
  }

  else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionid: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {

  const newCart = [];

  cart.forEach((cartItem) => {

    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }

  }); 

  cart = newCart;

  saveToStorage();

  
}

export function updateQuantity(productId,newQuantity) {

  
  let matchingItem;

  cart.forEach((items) => {

    if(productId === items.productId){
      matchingItem = items;
    }

  });

  matchingItem.quantity = newQuantity;

  document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;

  saveToStorage();
  

} 

export function updateDeliveryOption(productId,deliveryOptionid) {

  let matchingItem;

  cart.forEach((items) => {

    if(productId === items.productId){
      matchingItem = items;
    }

  });

  matchingItem.deliveryOptionid = deliveryOptionid;

  saveToStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}