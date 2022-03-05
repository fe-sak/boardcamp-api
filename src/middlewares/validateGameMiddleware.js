import connection from '../database.js';

export default async function validateGameCreate(req, res, next) {
  const { name, categoryId } = req.body;
  try {
    const queryResultGame = await connection.query(
      'SELECT * FROM games WHERE name=$1',
      [name]
    );

    const game = queryResultGame.rows[0];

    if (game) return res.sendStatus(409);

    const queryResultCategory = await connection.query(
      'SELECT id FROM categories WHERE id=$1',
      [categoryId]
    );

    const category = queryResultCategory.rows[0];

    if (!category) return res.status(400).send('Id de categoria não existe.');
  } catch {
    return res.sendStatus(500);
  }
  next();
}
