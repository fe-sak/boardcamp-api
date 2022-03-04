import connection from '../database.js';
import dayjs from 'dayjs';
import dayjsFormat from '../Utils/dayjsFormat.js';

export async function readCustomers(req, res) {
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

export async function readCustomerById(req, res) {
  const { id } = req.params;
  try {
    const queryResult = await connection.query(
      `SELECT * FROM customers
    WHERE  id=$1`,
      [id]
    );

    const customer = queryResult.rows[0];

    if (!customer) return res.status(400).send(`Customer Id doesn't exist.`);
    else {
      customer.birthday = dayjs(customer.birthday).format(dayjsFormat);

      return res.send(customer);
    }
  } catch {
    res.sendStatus(500);
  }
}

export async function createCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    await connection.query(
      `INSERT INTO customers (name, phone, cpf, birthday)
    VALUES ($1, $2, $3, $4)`,
      [name, phone, cpf, birthday]
    );
    return res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
}

export async function updateCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  const { id } = req.params;

  try {
    await connection.query(
      `UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;`,
      [name, phone, cpf, birthday, id]
    );

    return res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
}
