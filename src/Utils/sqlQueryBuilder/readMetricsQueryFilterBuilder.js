export default function readMetricsQueryFilterBuilder(startDate, endDate) {
  let sqlQueryFilter = '';
  if (startDate && endDate)
    sqlQueryFilter = `WHERE "rentDate" BETWEEN '${startDate}' AND '${endDate}'`;
  else {
    if (startDate) sqlQueryFilter = `WHERE "rentDate">='${startDate}'`;
    else if (endDate) sqlQueryFilter = `WHERE "rentDate"<='${endDate}'`;
  }
  return sqlQueryFilter;
}
