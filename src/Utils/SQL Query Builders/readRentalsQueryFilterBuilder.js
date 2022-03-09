export default function readRentalsQueryFilterBuilder(
  customerId,
  gameId,
  status,
  startDate
) {
  const sqlQueryFilter = [];
  if (customerId) sqlQueryFilter.push(`rentals."customerId"=${customerId}`);

  if (gameId) sqlQueryFilter.push(`rentals."gameId"=${gameId}`);

  if (status === 'open') sqlQueryFilter.push(`rentals."returnDate" IS NULL`);
  if (status === 'closed')
    sqlQueryFilter.push(`NOT rentals."returnDate" IS NULL`);

  if (startDate) sqlQueryFilter.push(`"rentDate">='${startDate}'`);

  if (sqlQueryFilter.length > 0) return `WHERE ${sqlQueryFilter.join(' AND ')}`;
  else return '';
}
