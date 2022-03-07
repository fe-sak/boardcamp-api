export default function readRentalsQueryFilterBuilder(
  customerId,
  gameId,
  status,
  startDate
) {
  let sqlQueryFilterById = '';
  if (customerId) {
    sqlQueryFilterById = `rentals."customerId"=${customerId}`;
  }
  if (gameId) {
    sqlQueryFilterById = `rentals."gameId"=${gameId}`;
  }

  let sqlQueryFilterByStatus = '';
  if (status === 'open') {
    sqlQueryFilterByStatus = `rentals."returnDate" IS NULL`;
  } else if (status === 'closed') {
    sqlQueryFilterByStatus = `NOT rentals."returnDate" IS NULL`;
  }

  let sqlQueryFilterByDate = '';
  if (startDate) sqlQueryFilterByDate = `"rentDate">='${startDate}'`;

  let sqlQueryFilter = `
    ${
      sqlQueryFilterById || sqlQueryFilterByStatus || sqlQueryFilterByDate
        ? 'WHERE'
        : ''
    } 
      ${sqlQueryFilterById} 
      ${sqlQueryFilterById && sqlQueryFilterByStatus ? 'AND' : ''}
      ${sqlQueryFilterByStatus}
      ${sqlQueryFilterByStatus && sqlQueryFilterByDate ? 'AND' : ''}
      ${
        sqlQueryFilterById && sqlQueryFilterByDate && !sqlQueryFilterByStatus
          ? 'AND'
          : ''
      }
      ${sqlQueryFilterByDate}`;

  return sqlQueryFilter;
}
