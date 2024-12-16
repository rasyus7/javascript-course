export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}

export default formatCurrency; /* can only export one thing with this syntax */
/* now when we import this, we can just import it with name */