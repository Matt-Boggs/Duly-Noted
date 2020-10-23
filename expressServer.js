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

app.get("api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
})

app.get("api/notes/:id", (req, res) => {
    let archNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))
    res.json(archNotes[Number(req.params.id)])
})





// Placed at the bottom so the wildcard doesnt trigger first
app.get("*", (req, res) => {
    res.sendFile(path.join(mainDir, "index.html"))
})

// ======== POST ===============

app.post("api/notes", (req, res) => {
    let archNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))
    let newEntry = req.body
    let thisID = (archNotes.length).toString()
    newEntry.id = thisID
    archNotes.push(newEntry)

    fs.writeFileSync("./db/db.json", JSON.stringify(archNotes));
    res.json(archNotes)
})  
//  ======== DELETE ================

app.delete("/api/notes:id", (req, res) => {
    let archNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))
    let delID = req.params.id
    let newID = 0
    archNotes = archNotes.filter(target => {
        return target.id != delID
    })
    for (target of archNotes){
        target.id = newID.toString()
        newID++
    }
    fs.writeFileSync("./db/db.json", JSON.stringify(archNotes))
    res.json(archNotes)
})
// ============== Listener ================

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})