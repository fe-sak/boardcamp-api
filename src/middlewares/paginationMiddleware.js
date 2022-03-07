export default async function pagination(req, res, next) {
  const { offset, limit, order, desc } = req.query;
  let sqlQueryString = '';

  if (order) {
    sqlQueryString += `ORDER BY "${order}" `;

    if (desc === 'true') {
      sqlQueryString += `DESC `;
    }
  }

  if (offset) {
    sqlQueryString += `OFFSET ${offset} `;
  }

  if (limit) {
    sqlQueryString += `LIMIT ${limit} `;
  }
  res.locals.sqlQueryOptions = sqlQueryString;
  next();
}
