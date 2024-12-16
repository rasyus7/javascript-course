export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1' /* added in this lesson */
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

/* when we click another delivery option, we should
  1)update the deliveryOptionId array
  2)update the page */
export function updateDeliveryOption(productId, deliveryOptionId) {
  /* productId: The ID of the product whose delivery option is being updated.
     deliveryOptionId: The new delivery option to assign to the product. */
  
  let matchingItem;

  cart.forEach((cartItem) => { /* Loops through the cart array (which contains objects for each product in the cart). */
    if (productId === cartItem.productId) {
      /*  If the productId of a cart item matches the provided productId, it assigns that item to matchingItem.*/
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}