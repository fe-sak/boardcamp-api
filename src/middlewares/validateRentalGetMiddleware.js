import connection from '../database.js';

export default async function validateRentalGet(req, res, next) {
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
