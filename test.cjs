const express = require('express')
const app = express()
const port = 3000

app.use(express.static('source'))

app.listen(port);