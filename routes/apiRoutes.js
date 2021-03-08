const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

router.get('/api/notes', (req, res) => {
  let notes = JSON.parse(fs.readFileSync('../db/db.json', 'utf8'))
  return res.json(notes);
});

router.post('api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuid.v4();

  let notes = JSON.parse(fs.readFileSync('../db/db.json', 'utf8'))
  notes.push(newNote);

  fs.writeFileSync('../db/db.json', JSON.stringify(notes));
  res.json(data);
})

module.exports = router;