const Pool = require('pg').Pool
var CONFIG = require('./db.json');

const pool = new Pool({
  user: CONFIG.user,
  host: CONFIG.host,
  database: CONFIG.database,
  password: CONFIG.password,
  port: CONFIG.port
})

const GetDevices = (request, response) => {
    pool.query('SELECT * FROM "Devices"', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    GetDevices
  }