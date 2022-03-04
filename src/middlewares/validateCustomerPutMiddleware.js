import connection from '../database.js';

export default async function validateCustomerPut(req, res, next) {
  const { cpf } = req.body;
  const { id } = req.params;

  try {
    const queryResult = await connection.query(
      `SELECT * FROM customers
    WHERE  id=$1`,
      [id]
    );

    const customer = queryResult.rows[0];

    if (!customer) return res.status(400).send(`Customer Id doesn't exist.`);

    if (customer.cpf !== cpf) {
      const queryResultCpf = await connection.query(
        `SELECT * FROM customers
      WHERE  cpf=$1`,
        [cpf]
      );

      const cpfExists = queryResultCpf.rows[0];

      if (cpfExists) return res.sendStatus(409);
    }
  } catch {
    return res.sendStatus(500);
  }
  next();
}
