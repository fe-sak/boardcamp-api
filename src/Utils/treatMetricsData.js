export default function (rentalsRaw, originalPriceTotalRaw, delayFeeTotalRaw) {
  const rentals = parseInt(rentalsRaw);
  const originalPriceTotal = parseInt(originalPriceTotalRaw);
  const delayFeeTotal =
    delayFeeTotalRaw !== null ? parseInt(delayFeeTotalRaw) : 0;

  const revenue = originalPriceTotal + delayFeeTotal;
  const average = parseInt(revenue / rentals);

  const metrics = { revenue, rentals, average };
  return metrics;
}
