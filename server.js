const express = require('express');
const path = require('path');
const fs = require('fs')
const app = express();
const PORT = process.env.PORT || 3002;
const uuid = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './db/db.json'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', (req, res) => {
  let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))
  return res.json(notes);
});

app.post('/api/notes', (req, res) => {
  let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  let newNote = req.body;
  newNote.id = uuid.v4();
  notes.push(newNote);

  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.json(notes);
})

app.get('/api/notes/:id', (req, res) => {
  let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(notes[Number(req.params.id)]);
});

app.delete('/api/notes/:id', (req, res) => {
  let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteID = req.params.id;
  notes.splice(noteID, 1);

  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.json(notes);
})

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});