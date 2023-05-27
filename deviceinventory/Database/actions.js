const Pool = require('pg').Pool
var CONFIG = require('../db.json');

const pool = new Pool({
  user: CONFIG.user,
  host: CONFIG.host,
  database: CONFIG.database,
  password: CONFIG.password,
  port: CONFIG.port
})

const GetDevices = async () => {
  const query = await pool.query('SELECT "d_ID", "Name", "IpAddress", "ManagementAddress", "Username", "CustomFields", "WaitingUsernames", "WaitingUsersCount" FROM "Devices"')
  return query.rows
}

const SetDevice = async (request) => {
  const query = await pool.query('INSERT INTO "Devices" ("Name", "IpAddress", "ManagementAddress", "Username") VALUES ($1, $2, $3, $4);', [request.Name, request.IpAddress, request.ManagementAddress, request.Username])
  console.log(query)
  return true;
}

module.exports = {
  GetDevices,
  SetDevice
}