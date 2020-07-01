const pool = require('./db-connector').pool

// List users
const getManufacturers = (request, response) => {
  pool.query('SELECT * FROM Manufacturers ORDER BY company_id ASC', (error, results) => {
    if (error) {
      console.log(error)
      response.status(500).send()
    } else {
      response.status(200).json(results.rows)
    }
  })
}

// List user by ID
const getManufacturerById = (request, response) => {
  let user_id = request.params.id
  pool.query('SELECT * FROM Manufacturers WHERE company_id = $1', [user_id], (error, results) => {
    if (error) {
      console.log(error)
      response.status(500).send()
    } else {
      response.status(200).json(results.rows)
    }
  })
}

// Create user
const createManufacturer = (request, response) => {
  pool.query('SELECT * FROM Manufacturers ORDER BY company_id ASC', (error, results) => {
    if (error) {
      console.log(error)
      response.status(500).send()
    } else {
      let users = results.rows
      let nextId = (users.length === 0) ? 0 : Math.max(...users.map(u => u.company_id)) + 1
      const { company_name, contact_name, contact_email, contact_number } = request.body
      pool.query(
        'INSERT INTO Manufacturers (company_id, company_name, contact_name, contact_email, contact_number) VALUES ($1, $2, $3, $4, $5)',
        [nextId, company_name, contact_name, contact_email, contact_number],
        (error, results) => {
          if (error) {
            console.log(error)
            response.status(500).send()
          } else {
            let responseData = {
              company_id: nextId,
              status: 'Success'
            }
            response.status(201).send(responseData)
          }
        })
    }
  })
}

// Update user by id
const updateManufacturerById = (request, response) => {
  let company_id = request.params.id
  const { company_name, contact_name, contact_email, contact_number } = request.body
  pool.query(
    'UPDATE Manufacturers SET company_name = ($2), contact_name = ($3), contact_email = ($4), contact_number = ($5) WHERE company_id = $1',
    [company_id, company_name, contact_name, contact_email, contact_number],
    (error, results) => {
      if (error) {
        console.log(error)
        response.status(500).send()
      } else {
        let responseData = {
          company_id: company_id,
          status: 'Success'
        }
        response.status(201).send(responseData)
      }
    })
}

// Delete user by id
const deleteManufacturerById = (request, response) => {
  let company_id = request.params.id
  pool.query('DELETE FROM Manufacturers WHERE company_id = $1 RETURNING *', [company_id], (error, results) => {
    if (error) {
      console.log(error)
      response.status(500).send()
    } else {
      let responseData = {
        company_id: company_id,
        status: 'Success'
      }
      response.status(201).send(responseData)
    }
  })
}


module.exports = {
  getManufacturers,
  getManufacturerById,
  createManufacturer,
  updateManufacturerById,
  deleteManufacturerById
}