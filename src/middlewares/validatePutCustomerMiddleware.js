export default async function validatePutCustomer(req, res, next) {
  const { cpf } = req.body;
  const { id } = req.params;

  try {
    const queryResult = await connection.query(
      `SELECT * FROM customers
    WHERE  id=$1`,
      [id]
    );

    const customer = queryResult.rows[0];

    if (!customer) return res.sendStatus(404);

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
    res.sendStatus(500);
  }
  next();
}
