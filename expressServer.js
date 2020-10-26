const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 8000;
const mainDir = path.join(__dirname, "/public"); // Start at /public

app.use(express.static('public')); // Allow files inside to be accessed, (allowing CSS styling)
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// ======== Routes =================
app.get("/notes", (req, res) => {
  res.sendFile(path.join(mainDir, "notes.html")); // Grabbing the notes html from 
})

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json")); // Grabbing entire file
})

app.get("/api/notes/:id", (req, res) => {
    let archNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8")); // read file, turn into object 
    res.json(archNotes[req.params.id]); // send user the note from notes obj, at the id we're requesting, all as an obj
})

// Placed at the bottom so the wildcard doesnt trigger first
app.get("*", (req, res) => {
    res.sendFile(path.join(mainDir, "index.html"));
})

// ======== POST ===============
// NOTICE THE IMPORTANCE OF DATA TYPE WITH SERVERS;  STRING/OBJ
app.post("/api/notes", (req, res) => {
    let archNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newEntry = req.body;
    let thisID = (archNotes.length).toString(); // This number must be a string to make it back into an obj later/ for server related issues down the road
    newEntry.id = thisID; // Adding Id property to newEntry obj, and setting it to equal string value
    archNotes.push(newEntry);

    fs.writeFileSync("./db/db.json", JSON.stringify(archNotes)); // To write the obj back to the server it must be a string
    res.json(archNotes);
})  

//  ======== DELETE ================

app.delete("/api/notes/:id", (req, res) => {
    let archNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let delID = req.params.id;
    let newID = 0;
    archNotes = archNotes.filter(target => { // returning the array with everything but the target with an id matching the delete id, basically deleting
        return target.id != delID;
    })
    for (target of archNotes){
        target.id = newID.toString(); //giving all the targets a new id number now that one has been removed
        newID++;
    }
    fs.writeFileSync("./db/db.json", JSON.stringify(archNotes)); // rewriting the file with the updated archNotes
    res.json(archNotes);
})
// ============== Listener ================

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`)
})

// WHEN RECEIVING DATA FROM A SERVER, IT IS ALWAYS SENT AS A STRING, SO YOU MUST JSON.PARSE IT TO MAKE IT INTO A JS OBJECT

//  WHEN SENDING DATA TO A SERVER, THE DATA MUST BE A STRING, SO YOU MUST JSON.STRINGIFY IT