import dayjs from 'dayjs';
import connection from '../database.js';
import dayjsFormat from '../Utils/dayjsFormat.js';

export async function readRentals(req, res) {
  const { customerId, gameId } = req.query;

  let query = '';
  if (customerId) {
    query = `WHERE rentals."customerId"=${customerId}`;
  }

  if (gameId) {
    query = `WHERE rentals."gameId"=${gameId}`;
  }
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
    ${query}`);

  const rentals = rentalsQuery.rows;

  const parsedRentals = rentals.map((rental) => {
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
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
