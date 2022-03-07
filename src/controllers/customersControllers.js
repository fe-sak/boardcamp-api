import connection from '../database.js';
import dayjs from 'dayjs';
import dayjsFormat from '../Utils/dayjsFormat.js';
import formatDate from '../Utils/formatDate.js';

export async function readCustomers(req, res) {
  const sqlQueryOptions = res.locals.sqlQueryOptions;
  const { cpf } = req.query;
  try {
    let sqlQueryFilterByCpf = '';
    if (cpf) {
      const cpfPattern = `'${cpf}%'`;
      sqlQueryFilterByCpf = `WHERE cpf LIKE ${cpfPattern}`;
    }

    const { rows: customers } = await connection.query(
      `SELECT
        customers.id,
        customers.name,
        customers.phone,
        customers.cpf,
        customers.birthday,
        COUNT(customers.id) AS "rentalsCount"
      FROM customers
        JOIN rentals ON customers.id=rentals."customerId"  
      GROUP BY
        customers.id
      ${sqlQueryFilterByCpf} 
      ${sqlQueryOptions}`
    );

    formatDate(customers, 'birthday');

    res.send(customers);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function readCustomerById(req, res) {
  const { id } = req.params;
  try {
    const { rows: customer } = await connection.query(
      `SELECT
        customers.id,
        customers.name,
        customers.phone,
        customers.cpf,
        customers.birthday,
        COUNT(customers.id) AS "rentalsCount"
      FROM customers
        JOIN rentals ON customers.id=rentals."customerId"  
      WHERE  customers.id=$1
      GROUP BY
        customers.id`,
      [id]
    );

    if (!customer) return res.status(400).send('Id de cliente não existe.');
    else {
      formatDate(customer, 'birthday');
      return res.send(customer[0]);
    }
  } catch (error) {
    console.log(error);
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
