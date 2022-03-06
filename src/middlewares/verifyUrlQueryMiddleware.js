export default async function verifyUrlQuery(req, res, next) {
  const { offset, limit } = req.query;
  let sqlQueryString = '';
  if (offset) {
    sqlQueryString += `OFFSET ${offset} `;
  }

  if (limit) {
    sqlQueryString += `LIMIT ${limit}`;
  }
  res.locals.sqlQueryOptions = sqlQueryString;
  next();
}
