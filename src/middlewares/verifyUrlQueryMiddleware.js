export default async function verifyUrlQuery(req, res, next) {
  const { offset, limit, order, desc } = req.query;
  console.log(order);
  let sqlQueryString = '';
  if (offset) {
    sqlQueryString += `OFFSET ${offset} `;
  }

  if (limit) {
    sqlQueryString += `LIMIT ${limit} `;
  }

  if (order) {
    sqlQueryString += `ORDER BY "${order}" `;

    if (desc === 'true') {
      sqlQueryString += `DESC `;
    }
  }
  res.locals.sqlQueryOptions = sqlQueryString;
  next();
}
