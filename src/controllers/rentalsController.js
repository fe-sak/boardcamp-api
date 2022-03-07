import dayjs from 'dayjs';
import connection from '../database.js';
import dayjsFormat from '../Utils/dayjsFormat.js';

export async function readRentals(req, res) {
  const { customerId, gameId, status, startDate } = req.query;
  const sqlQueryOptions = res.locals.sqlQueryOptions;

  let sqlQueryFilterById = '';
  if (customerId) {
    sqlQueryFilterById = `WHERE rentals."customerId"=${customerId}`;
  }
  if (gameId) {
    sqlQueryFilterById = `WHERE rentals."gameId"=${gameId}`;
  }

  let sqlQueryFilterByStatus = '';
  if (status === 'open') {
    sqlQueryFilterByStatus = `WHERE rentals."returnDate" IS NULL`;
  } else if (status === 'closed') {
    sqlQueryFilterByStatus = `WHERE NOT rentals."returnDate" IS NULL`;
  }

  let sqlQueryFilterByDate = '';
  if (startDate) sqlQueryFilterByDate = `WHERE "rentDate">='${startDate}'`;

  const rentalsQuery = await connection.query(`
  SELECT 
    rentals.*,
    customers.name AS "customerName",
    games.name AS "gameName",
    categories.id AS "categoryId",
    categories.name AS "categoryName"
  FROM rentals 
    JOIN customers ON rentals."customerId"=customers.id
    JOIN games ON rentals."gameId"=games.id
    JOIN categories ON games."categoryId"=categories.id
    ${sqlQueryFilterById}
    ${sqlQueryFilterByStatus}
    ${sqlQueryFilterByDate}
    ${sqlQueryOptions}`);

  const rentals = rentalsQuery.rows;

  let parsedRentals = rentals.map((rental) => {
    const {
      customerId,
      customerName,
      gameId,
      gameName,
      categoryId,
      categoryName,
      ...rest
    } = rental;

    return {
      ...rest,
      customer: {
        id: customerId,
        name: customerName,
      },
      game: {
        id: gameId,
        name: gameName,
        categoryId,
        categoryName,
      },
    };
  });

  res.send(parsedRentals);
}

export async function readMetrics(req, res) {
  const { startDate, endDate } = req.query;

  let sqlQueryFilter = '';
  if (startDate && endDate)
    sqlQueryFilter = `WHERE "rentDate" BETWEEN '${startDate}' AND '${endDate}'`;
  else {
    if (startDate) sqlQueryFilter = `WHERE "rentDate">='${startDate}'`;
    else if (endDate) sqlQueryFilter = `WHERE "rentDate"<='${endDate}'`;
  }

  try {
    const queryResult = await connection.query(
      `SELECT  
        COUNT(*) AS "rentals", 
        SUM("originalPrice") AS "originalPriceTotal", 
        SUM("delayFee") AS "delayFeeTotal" 
      FROM rentals ${sqlQueryFilter} `
    );
    const { rentals, originalPriceTotal, delayFeeTotal } = queryResult.rows[0];

    const revenue = originalPriceTotal + delayFeeTotal;
    const average = parseInt(revenue / rentals);

    const metrics = { revenue, rentals, average };

    res.send(metrics);
  } catch {
    return res.sendStatus(500);
  }
}

export async function createRental(req, res) {
  let rental = req.body;

  try {
    const pricePerDayQuery = await connection.query(
      `SELECT "pricePerDay" FROM games WHERE id=$1`,
      [rental.gameId]
    );

    const rentDate = dayjs().format(dayjsFormat);
    const pricePerDay = pricePerDayQuery.rows[0].pricePerDay;
    const originalPrice = pricePerDay * rental.daysRented;
    const returnDate = null;
    const delayFee = null;

    rental = { ...rental, rentDate, originalPrice, returnDate, delayFee };

    const rentalKeysParsed = Object.keys(rental).map((key) => `"${key}"`);
    const rentalValues = Object.values(rental);

    const queryString = `INSERT INTO rentals 
        (${rentalKeysParsed})
        VALUES ($1, $2, $3, $4, $5, $6, $7) `;

    await connection.query(queryString, rentalValues);
    return res.sendStatus(201);
  } catch {
    return res.sendStatus(500);
  }
}

export async function returnRental(req, res) {
  const { id } = req.params;
  const today = dayjs();
  const todayFormatted = today.format(dayjsFormat);
  let delayFee = null;
  try {
    const queryResult = await connection.query(
      `SELECT games."pricePerDay", rentals."rentDate", rentals."daysRented" FROM rentals
        JOIN games ON rentals."gameId"=games.id
        WHERE rentals.id=$1`,
      [id]
    );
    const pricePerDay = queryResult.rows[0].pricePerDay;
    const rentDate = queryResult.rows[0].rentDate;
    const daysRented = queryResult.rows[0].daysRented;

    const originalReturnDate = dayjs(rentDate).add(daysRented, 'day');
    const lateReturnDays = today.diff(originalReturnDate, 'days');

    if (lateReturnDays > 0) {
      delayFee = pricePerDay * lateReturnDays;
    }

    await connection.query(
      `UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3`,
      [todayFormatted, delayFee, id]
    );
    return res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
}

export async function deleteRental(req, res) {
  const { id } = req.params;

  try {
    await connection.query(`DELETE FROM rentals WHERE id=$1`, [id]);
    res.sendStatus(200);
  } catch {
    return res.sendStatus(500);
  }
}
