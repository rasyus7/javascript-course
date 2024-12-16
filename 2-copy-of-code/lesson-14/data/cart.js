/* this will give us the local storage we saved */
export let cart = JSON.parse(localStorage.getItem('cart'));
/* with export word, the file var can be used outside of cart.js */
/* rhis is called EXPORT */
if (!cart) { /* if cart is null(its empty), if the first lince od code,
  the "let cart=" didn't work we do rhis */
  cart = [{/* fitst cart item */
    /* de-duplicate items as we dont't need it,s name and stuff, we alreadt
    have it n the products.js */
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
  }, { /* second cart item */
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }];
} /* !!! cart is an array of objects */

function saveToStorage() { //Use setItem() to store a value under a specific key.
  localStorage.setItem('cart', JSON.stringify(cart)); 
  /* This code saves the cart array to localStorage by converting it into a JSON string. 
  It allows the cart data to persist even after the page is refreshed or closed.*/
  // save the current state of cart
}


/* in here we added the functioon from amazon.js to here as we should
think about which function belongs where, and for this inbstance
it makes more sente to put it in cart.js file */
export function addToCart(productId) { /* we also haver to export 
  this file as well */
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
      quantity: 1
    });
  }
  /* whenerver we update the card, we have to save it to storage so
  we can see the changes when we change the pages */
  saveToStorage();
}

export function removeFromCart(productId) {
  /* !!! why we create instead of deleting it 
  1) avoid side effects, s.a there is a code referencing this array
  2)better for immutability
  3)debugging much easier*/


  /* one way to remove the variable from cart=
  1)create new array
  2)loop through the cart
  3)add each product to the new array, except for this product id*/
  const newCart = [];

  cart.forEach((cartItem) => { /* add all the other existing ones to th
    e new array*/
    if (cartItem.productId !== productId) { /* we dont have to decla
      re the id and quantity as it's already declared inside
      the existing vars */
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  /* whenerver we update the card, we have to save it to storage so
  we can see the changes when we change the pages */ 
  saveToStorage(); /* local storage=save it in users browser */
  /* jeep in mind that local storage is not encrypted */
}