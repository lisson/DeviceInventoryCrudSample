const Pool = require('pg').Pool
var CONFIG = require('../db.json');
const logger = require('../logging')

const pool = new Pool({
  user: CONFIG.user,
  host: CONFIG.host,
  database: CONFIG.database,
  password: CONFIG.password,
  port: CONFIG.port
})

const GetDevices = async () => {
  logger.info("GetDevices")
  const query = await pool.query('SELECT "d_ID", "Name", "IpAddress", "ManagementAddress", "Username", "CustomFields", "WaitingUsernames", "WaitingUsersCount" FROM "Devices" WHERE "Hidden" = False ORDER BY "d_ID" ASC')
  var rows = query.rows
  logger.info(rows)
  return rows
}

const SetDevice = async (request) => {
  logger.info("SetDevice")
  logger.info(request)
  const query = await pool.query('INSERT INTO "Devices" ("Name", "IpAddress", "ManagementAddress", "Username", "Hidden") VALUES ($1, $2, $3, $4, False);', [request.Name, request.IpAddress, request.ManagementAddress, request.Username])
  logger.debug(query)
  return query.rowCount > 1;
}

const UpdateDevice = async (request) => {
  logger.info("ModifyDevice")
  logger.info(request)
  var updateQuery = BuildUpdateQuery(request)
  logger.debug(`Query: ${updateQuery.query}`)
  logger.debug(`Values: ${updateQuery.values}`)
  console.log(updateQuery.query)
  console.log(updateQuery.values)
  try
  {
    const query = await pool.query(updateQuery.query, updateQuery.values)
    logger.debug(query)
  }
  catch(error)
  {
    console.log(error)
    logger.error(error)
  }
  
}

function BuildUpdateQuery(request)
{
  if(request.d_ID == null)
  {
    logger.error("d_ID not available. cannot update")
    return null
  }
  var result = {};
  var count = 2
  result.query = ""
  result.values = []

  result.values.push(request.d_ID)
  delete request.d_ID
  
  for (let [key, value] of Object.entries(request))
  {
    logger.info(key, value);
    if(value)
    {
      result.query = result.query + `"${key}"=$${count},`
      result.values.push(value)
      count++
    }
  }
  
  if(result.query != "")
  {
    result.query = `UPDATE "Devices" SET ${result.query.slice(0,-1)} WHERE "d_ID" = $1;`
  }

  return result
}

module.exports = {
  GetDevices,
  SetDevice,
  UpdateDevice
}