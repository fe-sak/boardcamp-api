import connection from '../database.js';

export async function getCustomers(req, res) {
  try {
    if (req.query.cpf) {
      const cpfPattern = `${req.query.cpf}%`;
      const queryResult = await connection.query(
        `SELECT * FROM customers 
            WHERE cpf LIKE $1`,
        [cpfPattern]
      );
      res.send(queryResult.rows);
    } else {
      const queryResult = await connection.query(`SELECT * FROM customers`);
      res.send(queryResult.rows);
    }
  } catch {
    res.sendStatus(500);
  }
}

export async function postCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    await connection.query(
      `INSERT INTO customers (name, phone, cpf, birthday)
    VALUES ($1, $2, $3, $4)`,
      [name, phone, cpf, birthday]
    );
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
