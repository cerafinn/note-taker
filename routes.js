const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
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

router.delete('/api/notes/:id', (req, res) => {
  let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

  const newNotes = notes.filter( note => {
    return note.id !==req.params.id;
  })

  fs.writeFileSync('./db/db.json', JSON.stringify(newNotes));
  res.json(notes);
});

module.exports = router;