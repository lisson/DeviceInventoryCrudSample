const db = require('../Database/actions')
const DbQuery = require('../Database/query')

const GetDevices = (request, response) => {
    const getrows = async () => {
      const result = await db.GetDevices()
      response.status(200).json(result)
    }
    getrows()
}

const SetDevice = (request, response) => {
  var queryJson = request.body
  console.log(queryJson)
  const setDevice = async () => {
    const result = await db.SetDevice(queryJson)
    response.status(200).json(result)
  }
  setDevice()
}

module.exports = {
  GetDevices,
  SetDevice
}