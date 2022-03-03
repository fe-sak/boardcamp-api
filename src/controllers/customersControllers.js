import connection from '../database.js';
import dayjs from 'dayjs';

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

export async function getCustomerById(req, res) {
  const { id } = req.params;
  try {
    const queryResult = await connection.query(
      `SELECT * FROM customers
    WHERE  id=$1`,
      [req.params.id]
    );

    if (queryResult.rows.length === 0) return res.sendStatus(404);
    else {
      const customer = queryResult.rows[0];

      customer.birthday = dayjs(customer.birthday).format('YYYY-MM-DD');

      return res.send(customer);
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
