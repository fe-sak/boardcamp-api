import dayjs from 'dayjs';
import connection from '../database.js';
import dayjsFormat from '../Utils/dayjsFormat.js';

export default async function createRental(req, res) {
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
