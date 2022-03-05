import connection from '../database.js';

export async function validateRentalRead(req, res, next) {
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

export async function validateRentalCreate(req, res, next) {
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
    console.log(rentedGamesQuery.rows);

    let rentedGames = 0;
    rentedGamesQuery.rows.forEach(() => rentedGames++);

    if (gameStock <= rentedGames)
      return res.status(400).send('Todos os jogos foram alugados!');
  } catch {
    return res.sendStatus(500);
  }
  next();
}

export async function validateRentalUpdate(req, res, next) {
  next();
}
