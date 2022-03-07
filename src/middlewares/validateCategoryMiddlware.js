import connection from '../database.js';

export default async function validateCreateCategory(req, res, next) {
  const { name } = req.body;
  try {
    const queryResult = await connection.query(
      'SELECT * FROM categories WHERE name=$1',
      [name]
    );

    const category = queryResult.rows[0];

    if (category)
      return res
        .status(409)
        .send(`A categoria "${name}" já existe no banco de dados.`);
  } catch {
    return res.sendStatus(500);
  }
  next();
}
