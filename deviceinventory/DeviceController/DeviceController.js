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

const UpdateDevice = (request, response) => {
  var queryJson = request.body
  const updateDevice = async () => {
    const result = await db.UpdateDevice(queryJson)
    response.status(200).json(result)
  }
  updateDevice()
}

const GetDevicesByName = (request, response) => {
  var queryJson = request.body
  if(queryJson.Name === null)
  {
    response.status(400)
  }
  const getDevice = async () => {
    const result = await db.GetDevicesByName(queryJson.Name)
    response.status(200).json(result)
  }
  getDevice()
}

const ReserveDevice = (request, response) => {
  console.log(request.body)
  const reserve = async () => {
    const result = await db.GetDevices()
    console.log(result[0])
    if(request.body.Name)
    {
      var device = result.find((d) => d.Name.startsWith(request.body.Name)  && d.Username === "None")
    }
    if(request.body.d_ID)
    {
      var device = result.find((d) => d.d_ID == request.body.d_ID && d.Username === "None")
    }
    console.log(device)
    if(device)
    {
      console.log(device)
      var updateRequest = {}
      updateRequest.d_ID = device.d_ID
      updateRequest.Username = request.body.Username
      await db.UpdateDevice(updateRequest)
    }
    response.status(200).json(device)
  }
  reserve()
}

module.exports = {
  GetDevices,
  GetDevicesByName,
  SetDevice,
  UpdateDevice,
  ReserveDevice
}