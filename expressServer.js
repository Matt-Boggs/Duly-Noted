const express = require('express')
const path = require("path")
const fs = require("fs")
const app = express()
const port = 3000














// ======== Routes =================

app.get('/', (req, res) => {
  res.send('Hello World!')
})






app.get

// ============== Listener ================

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})