const express = require('express')
const app = express()
const port = 3000

app.use(express.json()) 

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3001'
}));

const controller = require('./DeviceController/DeviceController')


app.get('/', (req, res) => {
      res.send("")
})

app.get('/devices', controller.GetDevices)

app.post('/SetDevice', controller.SetDevice)


app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
})
