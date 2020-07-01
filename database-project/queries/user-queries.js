const pool = require('./db-connector').pool

const getUsers = (request, response) => {
  setTimeout(() => {
    pool.query('SELECT * FROM Users ORDER BY user_id ASC', (error, results) => {
      if (error) {
        console.log(error)
        response.status(500).send()
      } else {
        response.status(200).json(results.rows)
      }
    })
  }, 1500)
}

const getUserById = (request, response) => {
  let user_id = request.params.id
  pool.query('SELECT * FROM Users WHERE user_id = $1', [user_id], (error, results) => {
    if (error) {
      console.log(error)
      response.status(500).send()
    } else {
      response.status(200).json(results.rows)
    }
  })
}

const createUser = (request, response) => {
  pool.query('SELECT * FROM Users ORDER BY user_id ASC', (error, results) => {
    if (error) {
      console.log(error)
      response.status(500).send()
    } else {
      let users = results.rows
      let nextId = (users.length === 0) ? 0 : Math.max(...users.map(u => u.user_id)) + 1
      const { first_name, last_name, email } = request.body
      pool.query(
        'INSERT INTO Users (user_id, first_name, last_name, email) VALUES ($1, $2, $3, $4) RETURNING *',
        [nextId, first_name, last_name, email],
        (error, results) => {
          if (error) {
            console.log(error)
            response.status(500).send()
          } else {
            let responseData = {
              user_id: results.rows[0].user_id,
              status: 'Success'
            }
            response.status(201).send(responseData)
          }
        })
    }
  })
}

const updateUserById = (request, response) => {
  let user_id = request.params.id
  const { first_name, last_name, email } = request.body
  pool.query(
    'UPDATE Users SET first_name = ($2), last_name = ($3), email = ($4) WHERE user_id = $1',
    [user_id, first_name, last_name, email],
    (error, results) => {
      if (error) {
        console.log(error)
        response.status(500).send()
      } else {
        let responseData = {
          user_id: user_id,
          status: 'Success'
        }
        response.status(201).send(responseData)
      }
    })
}

const deleteUserById = (request, response) => {
  let user_id = request.params.id
  pool.query('DELETE FROM Users WHERE user_id = $1 RETURNING *', [user_id], (error, results) => {
    if (error) {
      console.log(error)
      response.status(500).send()
    } else {
      let responseData = {
        user_id: user_id,
        status: 'Success'
      }
      response.status(201).send(responseData)
    }
  })
}


module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
}