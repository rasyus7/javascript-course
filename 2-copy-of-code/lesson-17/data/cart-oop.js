function Cart(localStorageKey) { /* everytime you call this function it generates a new cart object */
  /* organize code into objects */
  /* oop tries to represent the real world, makes it easier to understand*/
  const cart = {
    cartItems: undefined, /* contains items in the cart */

    loadFromStorage() { /* metgod: function inside an object */
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

      if (!this.cartItems) { /* "this" gives the object that
        contains the function  */
        this.cartItems = [{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        }, {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }];
      }
    },

    saveToStorage() { /* shortcut for saveToStorage: function() {} */
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: '1'
        });
      }

      this.saveToStorage();
    },

    removeFromCart(productId) {
      const newCart = [];

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      this.cartItems = newCart;

      this.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
    }
  };

  return cart; /* returns cart object */
}

const cart = Cart('cart-oop'); /* will load from different keys in local stororage */
const businessCart = Cart('cart-business');
/* for business items */

cart.loadFromStorage();

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
