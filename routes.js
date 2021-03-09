const router = require('express').Router();
const path = require('path');
const fs = require('fs')
const uuid = require('uuid');

router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

router.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './db/db.json'));
});

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

router.get('/api/notes', (req, res) => {
  let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))
  return res.json(notes);
});

router.post('/api/notes', (req, res) => {
  let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  let newNote = req.body;
  newNote.id = uuid.v4();
  notes.push(newNote);

  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.json(notes);
})

router.get('/api/notes/:id', (req, res) => {
  let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  res.json(notes[Number(req.params.id)]);
});

router.delete('/api/notes/:id', (req, res) => {
  let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  let noteID = req.params.id;
  notes.splice(noteID, 1);

  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.json(notes);
});

module.exports = router;