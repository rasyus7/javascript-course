import {cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

let cartSummaryHTML = '';

cart.forEach((cartItem) => { /* cart is an object declared in 
  cart.js, it has two attributes the id and the quantity */
  /* for each cart item */
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => { /* product declared in products.js */
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML += /* for each item, generate the html */ `
    <div class="cart-item-container
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              <!-- we added the delete class for the js with the naming convention,
              "js-delete" -->
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options"> 
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
              <!-- for the radio to have options in both we have to declare 
              the radio "name" with unique ids-->
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML; /* in the checkout page, this is where
  we change the inner html */

document.querySelectorAll('.js-delete-link') 
/* select all of the radios with the class .js-delete-link */
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      /* !!!The dataset.productId retrieves the value
       of the "data-product-id" attribute for the clicked link.*/

      /* we also used this to declare this for the amazon main page,
      to add things tot the cart, the "date-product-id" */
      removeFromCart(productId);

      /* 1) use DOM to get the element to remove */
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
        /* .js-cart-item-container-123  */
      );
      /* 2) remove the html */
      container.remove();/*  Completely deletes the element from the DOM tree. */
      /* In this case, the product's container (with class js-cart-item-container-123) is removed. */
    });
  });
