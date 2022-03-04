import connection from '../database.js';

export async function readGames(req, res) {
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
  } catch {
    res.sendStatus(500);
  }
}

export async function createGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  try {
    await connection.query(
      'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    return res.sendStatus(201);
  } catch {
    return res.sendStatus(500);
  }
}
