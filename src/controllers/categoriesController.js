import connection from '../database.js';

export async function readCategories(req, res) {
  const sqlQueryOptions = res.locals.sqlQueryOptions;

  const { rows: categories } = await connection.query(
    `SELECT * FROM categories ${sqlQueryOptions}`
  );

  res.send(categories);
}

export async function createCategory(req, res) {
  const { name } = req.body;

  try {
    await connection.query('INSERT INTO categories (name) VALUES ($1)', [name]);
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
}
