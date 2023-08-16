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

app.get('/devices', controller.GetDevices)

app.get('/getdevicesbyname', controller.GetDevicesByName)

app.post('/SetDevice', controller.SetDevice)

app.post('/UpdateDevice', controller.UpdateDevice) // No real delete, just hide the row 

app.post('/ReserveDevice', controller.ReserveDevice)


app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
})
