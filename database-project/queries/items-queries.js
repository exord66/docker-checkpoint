const pool = require('./db-connector').pool

const getItems = (request, response) => {
  pool.query('SELECT * FROM Items ORDER BY item_id ASC', (error, results) => {
    if (error) {
      console.log(error)
      response.status(500).send()
    } else {
      response.status(200).json(results.rows)
    }
  })
}

const getItemById = (request, response) => {
  let item_id = request.params.id
  pool.query('SELECT * FROM Items WHERE item_id = $1', [item_id], (error, results) => {
    if (error) {
      console.log(error)
      response.status(500).send()
    } else {
      response.status(200).json(results.rows)
    }
  })
}

const createItem = (request, response) => {
  const { name, description } = request.body
  pool.query(
    'INSERT INTO Items (name, description) VALUES ($1, $2) RETURNING *',
    [name, description],
    (error, results) => {
      if (error) {
        console.log(error)
        response.status(500).send()
      } else {
        let responseData = {
          item_id: results.rows[0].item_id,
          status: 'Success'
        }
        response.status(201).send(responseData)
      }
    })
}

const updateItemById = (request, response) => {
  const item_id = request.params.id
  const { name, description } = request.body
  pool.query(
    'UPDATE Items SET name = ($2), description = ($3) WHERE item_id = $1',
    [item_id, name, description],
    (error, results) => {
      if (error) {
        console.log(error)
        response.status(500).send()
      } else {
        let responseData = {
          item_id: item_id,
          status: 'Success'
        }
        response.status(201).send(responseData)
      }
    })
}

const deleteItemById = (request, response) => {
  let item_id = request.params.id
  pool.query('DELETE FROM Items WHERE item_id = $1 RETURNING *', [item_id], (error, results) => {
    if (error) {
      console.log(error)
      response.status(500).send()
    } else {
      let responseData = {
        item_id: item_id,
        status: 'Success'
      }
      response.status(201).send(responseData)
    }
  })
}

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItemById,
  deleteItemById
}