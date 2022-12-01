const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'my_database',
  password: 'Balde12',
  port: 5432,
});

const getMerchants = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM merchants ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const createMerchant = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, email, job, age } = body

    pool.query('INSERT INTO merchants (name, email, job, age) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, job, age], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new client has been added: ${JSON.stringify(results.rows[0])}`)
    })
  })
}

const deleteMerchant = (merchantId) => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(merchantId)

    pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Client deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getMerchants,
  createMerchant,
  deleteMerchant,
}