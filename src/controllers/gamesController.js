import connection from '../database.js';

export async function getGames(req, res) {
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

export async function postGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  const parsedStockTotal = parseInt(stockTotal);
  const parsedPricePerDay = parseInt(pricePerDay);
  try {
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
