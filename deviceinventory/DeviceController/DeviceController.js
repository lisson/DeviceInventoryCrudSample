const db = require('../Database/actions')
const DbQuery = require('../Database/query')
const logger = require('../logging')

const GetDevices = (request, response) => {
    const getrows = async () => {
      try
      {
        const result = await db.GetDevices()
        response.status(200).json(result)
      }
      catch(error)
      {
        logger.error(error)
      }
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
    try
    {
      const result = await db.UpdateDevice(queryJson)
      response.status(200).json(result)
    }
    catch(error)
    {
      logger.error(error)
    }
    
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
  const reserve = async () => {
    logger.debug(request.body.Name)
    logger.debug(request.body.d_ID)
    if(request.body.Name)
    {
      var result = await db.GetDevicesByName(request.body.Name)
      var device = result.find((d) => !d.Username)
    }
    if(request.body.d_ID)
    {
      logger.info(`Reserving ${request.body.d_ID}`)
      var device = result.find((d) => d.d_ID == request.body.d_ID && !d.Username)
    }
    logger.info(`Reserving ${device}`)
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


const ReleaseDevice = (request, response) => {
  console.log("Release Device")
  if(!request.body.d_ID)
  {
    response.status(400)
    response.send("d_ID not set.")
    return
  }
  const release = async () => {
    var updateRequest = {}
    updateRequest.d_ID = request.body.d_ID
    updateRequest.Username = ""
    await db.UpdateDevice(updateRequest)
    response.status(200).send("OK")
  }
  release()
}

module.exports = {
  GetDevices,
  GetDevicesByName,
  SetDevice,
  UpdateDevice,
  ReserveDevice,
  ReleaseDevice
}