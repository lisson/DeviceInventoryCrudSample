const express = require('express')
const app = express()
const port = 3000

app.use(express.json()) 

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3001'
}));

const logger = require('./logging')

const controller = require('./DeviceController/DeviceController')

logger.info("Starting deviceinventory.")

app.get('/', (req, res) => {
      res.send("")
})

app.get('/get-devices', controller.GetDevices)

app.get('/get-devices-by-name', controller.GetDevicesByName)

app.post('/set-device', controller.SetDevice)

app.post('/update-device', controller.UpdateDevice) // No real delete, just hide the row 

app.post('/reserve-device', controller.ReserveDevice)

app.post('/release-device', controller.ReleaseDevice)


app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
})
