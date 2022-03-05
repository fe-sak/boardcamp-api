import connection from '../database.js';

export async function validateReadRentals(req, res, next) {
  const { customerId, gameId } = req.query;
  try {
    if (customerId) {
      const customerIdQuery = await connection.query(
        `SELECT * FROM customers WHERE id=$1`,
        [customerId]
      );

      const customer = customerIdQuery.rows[0];

      if (!customer) return res.status(400).send('Id de cliente não existe');
    }

    if (gameId) {
      const gameIdQuery = await connection.query(
        `SELECT * FROM games WHERE id=$1`,
        [gameId]
      );

      const game = gameIdQuery.rows[0];

      if (!game) return res.status(400).send('Id do jogo não existe.');
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
  next();
}

export async function validateCreateRental(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;
  try {
    const customerIdQuery = await connection.query(
      `SELECT * FROM customers WHERE id=$1`,
      [customerId]
    );

    const customer = customerIdQuery.rows[0];

    if (!customer) return res.status(400).send('Id de cliente não existe');

    const gameIdQuery = await connection.query(
      `SELECT * FROM games WHERE id=$1`,
      [gameId]
    );

    const game = gameIdQuery.rows[0];

    if (!game) return res.status(400).send('Id do jogo não existe.');

    if (daysRented <= 0)
      return res.status(400).send('Dias alugados devem ser maiores que zero.');

    const gameStock = game.stockTotal;

    const rentedGamesQuery = await connection.query(
      `SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL`,
      [gameId]
    );

    let rentedGames = 0;
    rentedGamesQuery.rows.forEach(() => rentedGames++);

    if (gameStock <= rentedGames)
      return res.status(400).send('Todos os jogos foram alugados!');
  } catch {
    return res.sendStatus(500);
  }
  next();
}

export async function validateReturnRental(req, res, next) {
  const { id } = req.params;

  try {
    const rentalExistsQuery = await connection.query(
      `SELECT * FROM rentals WHERE id=$1`,
      [id]
    );
    const rentalExists = rentalExistsQuery.rows[0];
    if (!rentalExists) return res.status(404).send('Id de aluguel não existe.');

    const isRentalFinishedQuery = await connection.query(
      `SELECT * FROM rentals WHERE id=$1 AND NOT "returnDate" IS NULL`,
      [id]
    );
    const isRentalFinished = isRentalFinishedQuery.rows[0];
    if (isRentalFinished) return res.status(400).send('Aluguel já finalizado.');
  } catch {
    return res.sendStatus(500);
  }
  next();
}
