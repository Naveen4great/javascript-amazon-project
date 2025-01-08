export function formatCurrency(priceCents) {

 const number =  ((Math.round(priceCents) / 100)*85).toFixed(0);

 const formatter = new Intl.NumberFormat('en-US');

 return formatter.format(number);

}