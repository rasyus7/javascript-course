/* for the 3 delivery options that we show */
export const deliveryOptions = [{ /* for each of delivery the options,
  we will save the value as id */
  /* rhis is an array! at least we use it as an array */
  /* !!!way we use this is, if there is a delivery option
  declared, we can get value by option.id === deliveryOptionId
  basically sxave the unnecssary info inside this array of 3 instances
  for removing clutter*/
  id: '1',
  deliveryDays: 7,
  priceCents: 0 /* try to save the money in cents always */
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}]; 

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => { /* Loops through the deliveryOptions array.
    which has only 3 vars */
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
  /* If a match is found, it returns the deliveryOption.
  If no match is found (i.e., deliveryOption is undefined), 
  it returns the first option in the deliveryOptions array as a default. */
}