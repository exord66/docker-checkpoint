const pool = require('./db-connector').pool

const getPurchaseOrders = (request, response) => {
  pool.query('SELECT * FROM PurchaseOrders ORDER BY po_id ASC', (error, results) => {
    if (error) {
      console.log(error)
      response.status(500).send()
    } else {
      response.status(200).json(results.rows)
    }
  })
}

const getPurchaseOrderById = (request, response) => {
  let po_id = request.params.id
  pool.query('SELECT * FROM PurchaseOrders WHERE po_id = $1', [po_id], (error, results) => {
    if (error) {
      console.log(error)
      response.status(500).send()
    } else {
      response.status(200).json(results.rows)
    }
  })
}

const createPurchaseOrder = (request, response) => {
  let { user_id, manufacturer_id, item_id, quantity } = request.body
  let ts = Date()
  pool.query(
    'INSERT INTO PurchaseOrders (user_id, manufacturer_id, item_id, quantity, date_order, date_received) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [ user_id, manufacturer_id, item_id, quantity, ts, 'none'],
    (error, results) => {
      if (error) {
        console.log(error)
        response.status(500).send()
      } else {
        let responseData = {
          po_id: results.rows[0].po_id,
          status: 'Success'
        }
        response.status(201).send(responseData)
      }
    })
}

const updatePurchaseOrderById = (request, response) => {
  const po_id = request.params.id
  const { user_id, manufacturer_id, item_id, quantity, date_order, date_received } = request.body
  pool.query(
    'UPDATE PurchaseOrders SET user_id = ($2), manufacturer_id = ($3), item_id = ($4), quantity = ($5), date_order = ($6), date_received = ($7) WHERE po_id = $1',
    [po_id, user_id, manufacturer_id, item_id, quantity, date_order, date_received],
    (error, results) => {
      if (error) {
        console.log(error)
        response.status(500).send()
      } else {
        let responseData = {
          po_id: po_id,
          status: 'Success'
        }
        response.status(201).send(responseData)
      }
    })
}

const deletePurchaseOrderById = (request, response) => {
  let po_id = request.params.id
  pool.query('DELETE FROM PurchaseOrders WHERE po_id = $1 RETURNING *', [po_id], (error, results) => {
    if (error) {
      console.log(error)
      response.status(500).send()
    } else {
      let responseData = {
        po_id: po_id,
        status: 'Success'
      }
      response.status(201).send(responseData)
    }
  })
}

module.exports = {
  getPurchaseOrders,
  getPurchaseOrderById,
  createPurchaseOrder,
  updatePurchaseOrderById,
  deletePurchaseOrderById
}