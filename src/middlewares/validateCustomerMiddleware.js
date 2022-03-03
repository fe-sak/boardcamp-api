import connection from '../database.js';

export default async function validateCustomer(req, res, next) {
  const { cpf } = req.body;
  try {
    const customerExists = await connection.query(
      `SELECT * FROM customers 
    WHERE cpf=$1`,
      [cpf]
    );
    if (customerExists.rows.length !== 0) return res.sendStatus(409);
  } catch {
    return res.sendStatus(500);
  }
  next();
}
