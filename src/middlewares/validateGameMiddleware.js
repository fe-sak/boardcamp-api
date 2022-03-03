import gameSchema from '../schemas/gameSchema.js';
import validateSchema from './validateSchemaMiddleware.js';
import connection from '../database.js';

export default async function validateGame(req, res, next) {
  const { name, categoryId } = req.body;
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
    if (categoryIdExists.rows.length === 0)
      return res.status(400).send("Category Id doesn't exist");
  } catch {
    return res.sendStatus(500);
  }
  next();
}
