const pool = require('./db-connector').pool

const getSalesOrders = (request, response) => {
  pool.query('SELECT * FROM SalesOrders ORDER BY so_id ASC', (error, results) => {
    if (error) {
      console.log(error)
      response.status(500).send()
    } else {
      response.status(200).json(results.rows)
    }
  })
}

const getSalesOrderById = (request, response) => {
  let so_id = request.params.id
  pool.query('SELECT * FROM SalesOrders WHERE so_id = $1', [so_id], (error, results) => {
    if (error) {
      console.log(error)
      response.status(500).send()
    } else {
      response.status(200).json(results.rows)
    }
  })
}

const createSalesOrder = (request, response) => {
  let { user_id, customer_id, item_id, quantity } = request.body
  let ts = Date()
  pool.query(
    'INSERT INTO SalesOrders (user_id, customer_id, item_id, quantity, date_ordered, date_received) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [ user_id, customer_id, item_id, quantity, ts, 'none'],
    (error, results) => {
      if (error) {
        console.log(error)
        response.status(500).send()
      } else {
        let responseData = {
          so_id: results.rows[0].so_id,
          status: 'Success'
        }
        response.status(201).send(responseData)
      }
    })
}

const updateSalesOrderById = (request, response) => {
  const so_id = request.params.id
  const { user_id, customer_id, item_id, quantity, date_ordered, date_received } = request.body
  pool.query(
    'UPDATE SalesOrders SET user_id = ($2), customer_id = ($3), item_id = ($4), quantity = ($5), date_ordered = ($6), date_received = ($7) WHERE so_id = $1',
    [user_id, customer_id, item_id, quantity, date_ordered, date_received],
    (error, results) => {
      if (error) {
        console.log(error)
        response.status(500).send()
      } else {
        let responseData = {
          so_id: so_id,
          status: 'Success'
        }
        response.status(201).send(responseData)
      }
    })
}

const deleteSalesOrderById = (request, response) => {
  let so_id = request.params.id
  pool.query('DELETE FROM SalesOrders WHERE so_id = $1 RETURNING *', [so_id], (error, results) => {
    if (error) {
      console.log(error)
      response.status(500).send()
    } else {
      let responseData = {
        so_id: so_id,
        status: 'Success'
      }
      response.status(201).send(responseData)
    }
  })
}

module.exports = {
  getSalesOrders,
  getSalesOrderById,
  createSalesOrder,
  updateSalesOrderById,
  deleteSalesOrderById
}