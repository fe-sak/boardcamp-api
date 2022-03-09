export default async function pagination(req, res, next) {
  const { offset, limit, order, desc } = req.query;
  let sqlQuery = [];

  if (order) {
    sqlQuery.push(`ORDER BY "${order}"`);

    if (desc === 'true') {
      sqlQuery.push(`DESC`);
    }
  }

  if (offset) sqlQuery.push(`OFFSET ${offset}`);

  if (limit) sqlQuery.push(`LIMIT ${limit}`);

  if (sqlQuery.length > 0) res.locals.sqlQueryOptions = `${sqlQuery.join(' ')}`;
  else res.locals.sqlQueryOptions = '';
  next();
}
