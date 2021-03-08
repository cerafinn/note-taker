const router = require('express').Router();
const notes = require('./db/db.json');
const filterByTitle = require('../lib/notes')


router.get('/api/notes', (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByTitle(req.query, results);
  };
  res.json(results);
});

// router to post new note

// router to remove note

module.exports = router;