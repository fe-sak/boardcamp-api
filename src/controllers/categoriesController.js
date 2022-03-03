import connection from '../database.js';

export async function getCategories(req, res) {
  const queryResult = await connection.query('SELECT * FROM categories');
  res.send(queryResult.rows);
}

export async function postCategory(req, res) {
  const { name } = req.body;

  try {
    await connection.query('INSERT INTO categories (name) VALUES ($1)', [name]);
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
}
