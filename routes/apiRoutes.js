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

module.exports = router;