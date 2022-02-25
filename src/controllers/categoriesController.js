import connection from '../database.js';

export async function listCategories(req, res) {
  const queryResult = await connection.query('SELECT * FROM categories');
  console.log(queryResult.rows);
  res.send(queryResult.rows);
}

export async function insertCategory(req, res) {
  const { name } = req.body;

  const categoryExists = await connection.query(
    'SELECT * FROM categories WHERE name=$1',
    [name]
  );
  console.log(categoryExists.rows);
  if (categoryExists.rows.length !== 0) return res.sendStatus(409);

  try {
    const queryResult = await connection.query(
      'INSERT INTO categories (name) VALUES ($1)',
      [name]
    );
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
}
