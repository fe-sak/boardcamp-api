import connection from '../database.js';

export async function validateCreateCustomer(req, res, next) {
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

export async function validateReadCustomerById(req, res, next) {
  const { id } = req.params;
  const queryResult = await connection.query(
    `SELECT * FROM customers
  WHERE  id=$1`,
    [id]
  );

  const customer = queryResult.rows[0];

  if (!customer) return res.status(400).send('Id de cliente não existe.');
  next();
}

export async function validateUpdateCustomer(req, res, next) {
  const { cpf } = req.body;
  const { id } = req.params;

  try {
    const queryResult = await connection.query(
      `SELECT * FROM customers
    WHERE  id=$1`,
      [id]
    );

    const customer = queryResult.rows[0];

    if (!customer) return res.status(400).send('Id de cliente não existe.');

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
