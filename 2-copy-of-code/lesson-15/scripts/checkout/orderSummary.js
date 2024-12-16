import {cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';/* named export */
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
/* code is coming from internet(hello and dayjs), this way import is called ESM version*/
/* not every libaray has ESM version so we still have to use script tag */
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';/* default export("default expor"included in file) */
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';

export function renderOrderSummary() {
  /* this is for creating/generating html */
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => { /* for ecah item in CART */
    /* !!!cart item is one of the objects */
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;/* the attribute we declared in this lesson */

    const deliveryOption = getDeliveryOption(deliveryOptionId);
    /* get delivery option from the array of delivery options key-value
    pair variable */
    
    /* things we want to accomplish, using dayjs() for this
    1)get todays date
    2)do calculations for days of order
    3)display date in easy-to-read format */
    const today = dayjs(); /* get the date from the external library */
    const deliveryDate = today.add(/* using the add method from the library */
      deliveryOption.deliveryDays, /* amount ogf days */
      'days' /* type of addition */
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM D' /* day, month and day of the month */
    );

    cartSummaryHTML += `
      <div class="cart-item-container
        js-cart-item-container-${matchingProduct.id}">
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
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
            <!-- !!!here we call the deliveryOptionsHTML code -->
          </div>
        </div>
      </div>
    `;
  });


  /* the way of thinking: 
  1)loop through delivery options
  2)for each option, generate some html
  3)combine html together */
  function deliveryOptionsHTML(matchingProduct, cartItem) { /* delivery options generate html(right side of products) */
    /* !!! we can split the contents of html, it doesn't fuck up
    the content */
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );

      const priceString = deliveryOption.priceCents === 0
        /* display free or the price accordimngly */
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      /* if delivery option checked before, it will be automatically selected*/


      /* generate html */
      html += `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <!-- !!!if checked use thrat one -->
          <input type="radio"
            ${isChecked ? 'checked' : ''}
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

    return html;
  }

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId; /* get the corresponding value from event listener */
        removeFromCart(productId);

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.remove();

        renderPaymentSummary(); /* without this, when we delete a cart item
        , the order summary(price on right) does not change  */
      });
    });

  document.querySelectorAll('.js-delivery-option')
  /* for chaning delivery option */
    .forEach((element) => {/* we call each of the options an element */
      element.addEventListener('click', () => {
        /*!!! we get these values from 1)data-product-id="${matchingProduct.id}"
          2)data-delivery-option-id="${deliveryOption.id}" */
        const {productId, deliveryOptionId} = element.dataset;
        /*!!! the line aboCe is same as 
        const productID = element.dataset.productID; */
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary(); /* recursion */
        renderPaymentSummary(); /* when we select another
        payment option, price changes, so in the order summary
        the value changesd as well! */
      });
    });
}