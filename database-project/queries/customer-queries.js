const { response } = require('express')

const pool = require('./db-connector').pool

const getCustomers = (request, response) => {
  pool.query('SELECT * FROM customers ORDER BY customer_id ASC', (error, results) => {
    if (error) {
      console.log(error)
      response.status(500).send()
    } else {
      response.status(200).json(results.rows)
    }
  })
}

const getCustomerById = (request, response) => {
  let customerId = request.params.id
  pool.query('SELECT * FROM customers WHERE customer_id = $1', [customerId], (error, results) => {
    if (error) {
      console.log(error)
      response.status(500).send()
    } else {
      response.status(200).json(results.rows)
    }
  })
}

const createCustomer = (request, response) => {
  const { company_name, contact_name, contact_email, contact_number } = request.body
  pool.query(
    'INSERT INTO Customers (company_name, contact_name, contact_email, contact_number) VALUES ($1, $2, $3, $4) returning *',
    [company_name, contact_name, contact_email, contact_number],
    (error, results) => {
      if (error) {
        console.log(error)
        response.status(500).send()
      } else {
        response.status(201).send(`User added with ID: ${results.customer_id}`)
      }
    })
}

const updateCustomerById = (request, response) => {
  let customerId = request.params.id
  const { company_name, contact_name, contact_email, contact_number } = request.body
  pool.query(
    'UPDATE Customers SET company_name = ($2), contact_name = ($3), contact_email = ($4), contact_number = ($5) WHERE customer_id = $1',
    [customerId, company_name, contact_name, contact_email, contact_number],
    (error, results) => {
      if (error) {
        console.log(error)
        response.status(500).send()
      } else {
        response.status(201).send(`User updated with ID: ${company_id}`)
      }
    })
}

const deleteCustomerById = (request, response) => {
  let customerId = request.params.id
  pool.query('DELETE FROM Customers WHERE customer_id = $1 RETURNING *', [customerId], (error, results) => {
    if (error) {
      console.log(error)
      response.status(500).send()
    } else {
      response.status(201).send(`Customer deleted with ID: ${user_id}`)
    }
  })
}

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomerById,
  deleteCustomerById
}