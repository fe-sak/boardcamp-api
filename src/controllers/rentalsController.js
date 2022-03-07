import dayjs from 'dayjs';
import connection from '../database.js';
import dayjsFormat from '../Utils/dayjs/dayjsFormat.js';
import formatDate from '../Utils/dayjs/formatDate.js';
import readMetricsQueryFilterBuilder from '../Utils/SQL Query Builders/readMetricsQueryFilterBuilder.js';
import readRentalsQueryFilterBuilder from '../Utils/SQL Query Builders/readRentalsQueryFilterBuilder.js';

export async function readRentals(req, res) {
  const { customerId, gameId, status, startDate } = req.query;
  const sqlQueryOptions = res.locals.sqlQueryOptions;

  const sqlQueryFilter = readRentalsQueryFilterBuilder(
    customerId,
    gameId,
    status,
    startDate
  );

  try {
    const { rows: rentals } = await connection.query(`
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
        ${sqlQueryFilter}
        ${sqlQueryOptions}`);

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

    formatDate(parsedRentals, 'rentDate');
    formatDate(parsedRentals, 'returnDate');

    res.send(parsedRentals);
  } catch {
    res.sendStatus(500);
  }
}

export async function readMetrics(req, res) {
  const { startDate, endDate } = req.query;

  const sqlQueryFilter = readMetricsQueryFilterBuilder(startDate, endDate);

  try {
    const { rows: metricsRaw } = await connection.query(
      `SELECT  
        COUNT(*) AS "rentalsRaw", 
        SUM("originalPrice") AS "originalPriceTotalRaw", 
        SUM("delayFee") AS "delayFeeTotalRaw" 
      FROM rentals 
      ${sqlQueryFilter} `
    );
    const { rentalsRaw, originalPriceTotalRaw, delayFeeTotalRaw } =
      metricsRaw[0];

    const rentals = parseInt(rentalsRaw);
    const originalPriceTotal = parseInt(originalPriceTotalRaw);
    const delayFeeTotal =
      delayFeeTotalRaw !== null ? parseInt(delayFeeTotalRaw) : 0;

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
    const pricePerDay = pricePerDayQuery.rows[0].pricePerDay;
    const originalPrice = pricePerDay * rental.daysRented;

    const rentDate = dayjs().format(dayjsFormat);
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
  const formattedToday = today.format(dayjsFormat);
  let delayFee = null;

  try {
    const { rows: rental } = await connection.query(
      `SELECT games."pricePerDay", rentals."rentDate", rentals."daysRented" FROM rentals
        JOIN games ON rentals."gameId"=games.id
        WHERE rentals.id=$1`,
      [id]
    );
    const pricePerDay = rental[0].pricePerDay;
    const rentDate = rental[0].rentDate;
    const daysRented = rental[0].daysRented;

    const originalReturnDate = dayjs(rentDate).add(daysRented, 'day');
    const lateReturnDays = today.diff(originalReturnDate, 'days');

    if (lateReturnDays > 0) {
      delayFee = pricePerDay * lateReturnDays;
    }

    await connection.query(
      `UPDATE 
        rentals 
      SET 
        "returnDate"=$1, 
        "delayFee"=$2 
      WHERE id=$3`,
      [formattedToday, delayFee, id]
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
