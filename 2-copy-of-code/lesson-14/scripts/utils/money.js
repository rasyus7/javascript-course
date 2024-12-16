/* utils created to have utils functions on one file */
export function formatCurrency(priceCents) {
  return (priceCents / 100).toFixed(2);
}