import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';
import {loadCart} from '../data/cart.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

async function loadPage() {
  try {
    // throw 'error1';

    await loadProductsFetch(); //second step

    const value = await new Promise((resolve, reject) => {
      // throw 'error2';
      loadCart(() => {
        // reject('error3');
        resolve('value3');
      });
    });

  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }

  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();

/*
// promise all let us run multiple promises at the same time
// inside the array, it waits for all the promises before going to 
// the next step
Promise.all([ 
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
// first load the products, then resolce with "value1"(log it)
// then the we go to then, we execute loadcart, then we go to the 
// calling other 2 functions
new Promise((resolve) => { 
  loadProducts(() => { //step 1
    resolve('value1');
  });

}).then((value) => { //step 2
  console.log(value);

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => { //step 3
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/* LESSON 18 CALLBACKS */
/* does the same thing a above but smaller code */
/*
loadProducts(() => { 
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
