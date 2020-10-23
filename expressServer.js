const express = require('express')
const path = require("path")
const fs = require("fs")
const app = express()
const port = 3000
const mainDir = path.join(__dirname, "/public")

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
















// ======== Routes =================

app.get('/notes', (req, res) => {
  res.sendFile(path.join(mainDir, "notes.html"))
})






app.get("*", (req, res) => {
    res.sendFile(path.join(mainDir, "index.html"))
})

// ============== Listener ================

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})