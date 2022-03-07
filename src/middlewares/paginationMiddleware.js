export default async function pagination(req, res, next) {
  const { offset, limit, order, desc } = req.query;
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
