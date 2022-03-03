import connection from '../database.js';

export default async function validateCustomerPost(req, res, next) {
  const { cpf } = req.body;
  try {
    const queryResult = await connection.query(
      `SELECT * FROM customers 
    WHERE cpf=$1`,
      [cpf]
    );

    const customer = queryResult.rows[0];

    if (customer) return res.sendStatus(409);
  } catch {
    return res.sendStatus(500);
  }
  next();
}
