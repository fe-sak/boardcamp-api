import connection from '../database.js';

export async function readGames(req, res) {
  const sqlQueryOptions = res.locals.sqlQueryOptions;
  const { name } = req.query;

  try {
    let filterByName = '';
    if (name) {
      const namePattern = `'${name}%'`;
      filterByName = `WHERE LOWER(games.name) LIKE LOWER(${namePattern})`;
    }
    const { rows: games } = await connection.query(
      `SELECT 
          games.*, 
          categories.name AS "categoryName",
          COUNT(rentals."gameId") AS "rentalsCount"
        FROM games 
          JOIN  categories ON games."categoryId"=categories.id
          LEFT JOIN rentals ON games.id=rentals."gameId"
        ${filterByName}
        GROUP BY
          games.id, 
          categories.name
       ${sqlQueryOptions}`
    );

    res.send(games);
  } catch {
    res.sendStatus(500);
  }
}

export async function createGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  try {
    await connection.query(
      `INSERT INTO games 
        (name, image, "stockTotal", "categoryId", "pricePerDay") 
      VALUES 
        ($1, $2, $3, $4, $5)`,
      [name, image, stockTotal, categoryId, pricePerDay]
    );

    return res.sendStatus(201);
  } catch {
    return res.sendStatus(500);
  }
}
