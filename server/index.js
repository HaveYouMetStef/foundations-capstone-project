const express = require('express')
const cors = require('cors')

const {getFragrances, createFragrance, updateFragrance, deleteFragrance} = require("./ctrl/controller")

const app = express()

const port = 4004

app.use(express.json())
app.use(cors())

// Endpoints
app.get('/api/fragrances', getFragrances)
app.post('/api/fragrances', createFragrance)
app.put('/api/fragrances/:id', updateFragrance)
app.delete('/api/fragrances/:id', deleteFragrance)

app.listen(port, ()=> console.log(`Listening on port ${port}`));