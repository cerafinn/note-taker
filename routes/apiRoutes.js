const router = require('express').Router();
const fs = require('fs');
const uuid = require('uuid');

router.get('/api/notes', async (req, res) => {
  let notes = await JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  return res.json(notes);
});

router.post('/api/notes', async (req, res) => {
  let notes = await JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  let newNote = req.body;
  newNote.id = uuid.v4();
  notes.push(newNote);

  await fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.json(notes);
})

router.delete('/api/notes/:id', async (req, res) => {
  let notes = await JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

  const newNotes = notes.filter( note => {
    return note.id !== req.params.id;
  })

  await fs.writeFileSync('./db/db.json', JSON.stringify(newNotes));
  res.json(notes);
});

module.exports = router;