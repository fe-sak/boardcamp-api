import connection from '../database.js';

export default async function validateCategory(req, res, next) {
  const { name } = req.body;
  try {
    const categoryExists = await connection.query(
      'SELECT * FROM categories WHERE name=$1',
      [name]
    );
    if (categoryExists.rows.length !== 0) return res.sendStatus(409);
  } catch {
    return res.sendStatus(500);
  }
  next();
}
