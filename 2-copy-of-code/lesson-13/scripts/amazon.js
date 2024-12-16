/* so basically, the website is mostly
can be made from the html+css, javascript
makes it interactive */

/* gits let us track changes in the code */

/* repository = folder where changes are being tracked */

/* how you find section of the webpage on code? 
search from the inspect the name of the class then go there
inspect->press the button that has a mouse
*/


/* main ideas of js->
1)save the data 
2)generate html 
3)make it interactive*/


let productsHTML = '';
/* we want to generate html code with js, as we have so many divs and such */
products.forEach((product) => { /* iterate through the json objects 
  this is a nice way to generate stuff*/
  /* in js, they useally use objects or arrays as data structures */
  /* with notation ${product.image}, get the value from the "product" iterations */
  productsHTML /* this is called the accumulator pattern */ += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)} /* show two decimals */
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});
/* data-product-id is a data attribute in html */
/* the reason we use product id is that there might be multiple items 
with the same value so its better practice to d o it this way */

/* benefit of generating html? = we can just run a loop in js
using the values saved inside a json object! */

document.querySelector('.js-products-grid').innerHTML = productsHTML;
// here is where we declare the products

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => { /* for every button we are
      listening or waiting for a click */
      const productId = button.dataset.productId;
      /* reason we use id instead of name is that it migt not be unique */
      console.log(productId)
      /* can control if event listenres is working by calling "console.log"*/
      let matchingItem;

      cart.forEach((item) => { /* identify if alreadt in cart */
        if (productId === item.productId) {
          matchingItem = item;
        }
      });

      if (matchingItem) { /* if in cart, increase quanttity by 1,
        else if not in cart add it to the cart */
        matchingItem.quantity += 1;
      } else {
        cart.push({
          productId: productId,
          quantity: 1
        });
      }

      let cartQuantity = 0;

      cart.forEach((item) => { /* total number of items */
        cartQuantity += item.quantity;
      });

      document.querySelector('.js-cart-quantity') 
        /* chanhe the html so that it shows the correct number of 
        items in the cart */
        .innerHTML = cartQuantity;
    });
  });