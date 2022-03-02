import connection from '../database.js';

export async function listGames(req, res) {
  try {
    if (req.query.name) {
      const namePattern = `${req.query.name}%`;
      const queryResult = await connection.query(
        `SELECT games.*, categories.name AS "categoryName" FROM games 
            JOIN  categories ON games."categoryId"=categories.id
            WHERE LOWER(games.name) LIKE LOWER($1)`,
        [namePattern]
      );
      res.send(queryResult.rows);
    } else {
      const queryResult = await connection.query(
        `SELECT games.*, categories.name AS "categoryName" FROM games 
            JOIN  categories ON games."categoryId"=categories.id`
      );
      res.send(queryResult.rows);
    }
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
}

export default async function insertGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  try {
    const gameExists = await connection.query(
      'SELECT * FROM games WHERE name=$1',
      [name]
    );
    if (gameExists.rows.length !== 0) return res.sendStatus(409);

    const categoryIdExists = await connection.query(
      'SELECT id FROM categories WHERE id=$1',
      [categoryId]
    );
    if (categoryIdExists.rows.length === 0) return res.sendStatus(400);

    const parsedStockTotal = parseInt(stockTotal);
    const parsedPricePerDay = parseInt(pricePerDay);

    if (
      isNaN(parsedStockTotal) ||
      isNaN(parsedPricePerDay) ||
      parsedStockTotal < 0 ||
      parsedPricePerDay < 0
    )
      return res.sendStatus(400);

    await connection.query(
      'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',
      [name, image, parsedStockTotal, categoryId, parsedPricePerDay]
    );
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
