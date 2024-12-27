import {cart} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';
import {addOrder} from '../../data/orders.js';

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">
        $${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary
      js-place-order">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;

  /* Collect the cart data

  Send it to a server

  Process the response

  Store the order information

  Redirect to an order confirmation page */
  document.querySelector('.js-place-order') /* these are products in
  order */
    .addEventListener('click', async () => {
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', { 
        // the most likely reason I don't get the response is that this might be 
        // a server that is not really working for now
        // send data to the backend
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            /* we have to convert json to send to backend */
          },
          body: JSON.stringify({
            cart: cart
          })
        });

        const order = await response.json(); 
        console.log(order);
        console.log('success');
        /* we are waiting the response */
        /* order object has order id, quantity */

        /* after we create an order from the backend, we add the order to
        an array saved in local storage */
        addOrder(order);

          // Add a delay before redirecting
        setTimeout(() => {
          window.location.href = 'orders.html';
        }, 1000); // Delays redirect by 1 second

      } catch (error) {
        console.log('Unexpected error. Try again later.');
      }

      window.location.href = 'orders.html';
      /* changes the url! this is how in kocayusuf website we redirect to other pages */
    });
}